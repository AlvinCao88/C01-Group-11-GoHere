import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


export default function Map() {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState({ latitude: 43.78309609, longitude: -79.1873263 });
    const [errorMsg, setErrorMsg] = useState(null);

    const navigation = useNavigation();


    const handleMarkerPress = (markerId) => {
        // Navigate to another screen when a marker is pressed
        navigation.navigate('WashroomInfo', { id: markerId })
    };

    useEffect(() => {
        fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms`)
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    setMarkers(data.response);
                    setLoading(false);
                } else {
                    throw new Error(`Error fetching washrooms: ${data.error}`);
                }
            })
            .catch(error => {
                console.error(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                console.error(errorMsg);
                return;
            }
            try {
                let location = await Location.getCurrentPositionAsync({});
                setCenter(location.coords); // Update center with location coordinates
                // console.log('Updated center:', center);
            } catch (error) {
                console.error('Error getting current location:', error);
            }
        })();
    }, []);

    const styles = StyleSheet.create({
        map: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        },
    });

    return (
        <MapView
            style={styles.map}
            showsUserLocation={true}
            region={{
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            // onRegionChange={(region) => setCenter(region)} 
        >
            {loading ? null : markers.map((marker) => (
                <Marker
                    key={marker._id}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    title={marker.name}
                    description={marker.fullAddress}
                    onPress={() => handleMarkerPress(marker._id)}
                />
            ))}
            <Marker
                key={"You are here"}
                coordinate={center}
                title={"You are here!"}
                image={require('../../assets/here.png')}
                // Attribute: "https://www.flaticon.com/free-icons/my-location" title="my location icons">My location icons created by zero_wing - Flaticon</a>
            />
        </MapView>
    );
}
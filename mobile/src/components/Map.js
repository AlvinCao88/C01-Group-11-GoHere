import dotenv from "dotenv";
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions , Alert} from 'react-native';


export default function Map() {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);

    // const [center, setCenter] = useState(null);

    useEffect(() => {
        fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms`)
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    setMarkers(data.response);
                    setLoading(false);
                } else {
                    console.error("Error fetching washrooms:", data.error);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Error fetching washrooms:", error);
                setLoading(false);
            });
    }, []);

    

    let center = { latitude: 43.78309609, longitude: -79.1873263 };
    const styles = StyleSheet.create({
        map: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height 
        },
    });
    

    return (
        // <View>
        <MapView
        
            style={styles.map}
        showsUserLocation={true}
            initialRegion={{
                latitude: center.latitude,
                longitude: center.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            
            {loading ? null : markers.map((marker) => (
                <Marker
                    key={marker._id}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    title={marker.name}
                    description={marker.fullAddress}
                />
            ))}


            <Marker
                key={"You are here"}
                coordinate={center}
                title={"You are here!"}
                image={require('../../assets/here.png')} //./assets/navigation.png
                // Attribute: "https://www.flaticon.com/free-icons/my-location" title="my location icons">My location icons created by zero_wing - Flaticon</a>
            />


        </MapView>
        // <WashroomBottomSheet/>
        // </View>

            
    );
}


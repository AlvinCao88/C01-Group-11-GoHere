// import React, { useState, useEffect, useRef } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Supercluster from 'supercluster';
// import useSupercluster from 'use-supercluster';

// export default function App() {
//   const generateRandomMarkers = () => {
//     const numMarkers = 100; // Number of random markers
//     const markers = [];

//     // Generate markers with very close coordinates
//     for (let i = 0; i < numMarkers; i++) {
//       const variation = 0.001;
//       let latitude = 43.78309609 + (Math.random() * variation * 2 - variation);
//       let longitude = -79.1873263 + (Math.random() * variation * 2 - variation);
//       let title = "marker"+i;

//       markers.push({ id: i * 2, title: title, latitude, longitude });
//     }

//     return markers;
//   };

//   const [markers, setMarkers] = useState([]);
//   const [zoom, setZoom] = useState(10);
//   const bounds = useRef(null);

//   useEffect(() => {
//     setMarkers(generateRandomMarkers());
//   }, []);

//   const handleRegionChange = (region) => { //check if we need this
//     setZoom(region.longitudeDelta);
//   };

//   const onRegionChangeComplete = (region) => {
//     // Update bounds and zoom level
//     bounds.current = [
//       region.longitude - region.longitudeDelta / 2,
//       region.latitude - region.latitudeDelta / 2,
//       region.longitude + region.longitudeDelta / 2,
//       region.latitude + region.latitudeDelta / 2,
//     ];
//     setZoom(Math.round(Math.log2(360 / region.longitudeDelta) + 1));
//   };

//   const { clusters } = useSupercluster({
//     points: markers.map(marker => ({
//       type: 'Feature',
//       properties: { cluster: false, id: marker.id, title: marker.title },
//       geometry: { type: 'Point', coordinates: [marker.longitude, marker.latitude] },
//     })),
//     bounds: [-180, -85, 180, 85],
//     zoom,
//     options: { radius: 75, maxZoom: 20 }
//   });

//   // console.log(zoom)
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 43.78309609, //change this to center.latittude
//           longitude: -79.1873263,//change this to center.longitutde
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//         onRegionChangeComplete={onRegionChangeComplete}
//       >
//         {/* Render clustered markers */}
//         {clusters.map(cluster => {
//           // Check if the cluster is null or undefined
//           if (!cluster) return null;

//           // Check if the cluster represents a single marker
//           console.log(cluster.properties.point_count)
//           if (cluster.properties.point_count === undefined) {
//             return (
//               <Marker
//                 key={cluster.properties.id}
//                 coordinate={{
//                   latitude: cluster.geometry.coordinates[1],
//                   longitude: cluster.geometry.coordinates[0],
//                 }}
//                 title={cluster.properties.title}
//                 // image={require('../AwesomeProject/assets/favicon.png')}
//               />
//             );
//           } else {
//             // Render clustered markers
//             return (
//               <Marker
//                 key={cluster.id}
//                 // title={"hello"}
//                 title={`${cluster.properties.point_count} markers`}
//                 coordinate={{
//                   latitude: cluster.geometry.coordinates[1],
//                   longitude: cluster.geometry.coordinates[0],
//                 }}
                
                
//                 // Custom image for clusters
//                 // image={require('../../assets/here.png')}
//               />
//             );
//           }
//         })}
//       </MapView>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });






import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import useSupercluster from 'use-supercluster';



export default function Map() {
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState({ latitude: 43.78309609, longitude: -79.1873263 });
    // const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const bounds = useRef(null);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }
            try {
                let location = await Location.getCurrentPositionAsync({});
                setCenter({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            } catch (error) {
                console.error('Error getting current location:', error);
            }
        })();
    }, []);

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

    

    const onRegionChangeComplete = (region) => {
        // Update bounds and zoom level
        bounds.current = [
          region.longitude - region.longitudeDelta / 2,
          region.latitude - region.latitudeDelta / 2,
          region.longitude + region.longitudeDelta / 2,
          region.latitude + region.latitudeDelta / 2,
        ];
        setZoom(Math.round(Math.log2(360 / region.longitudeDelta) + 1));
      };
    
      const { clusters } = useSupercluster({
        points: markers.map(marker => ({
          type: 'Feature',
          properties: { cluster: false, id: marker._id, title: marker.name, description: marker.fullAddress},
          geometry: { type: 'Point', coordinates: [marker.longitude, marker.latitude] },
        })),
        bounds: [-180, -85, 180, 85],
        zoom,
        options: { radius: 75, maxZoom: 20 }
      });
    return (
        <MapView
        style={styles.map}
        region={{
          latitude: center.latitude, //change this to center.latittude
          longitude: center.longitude,//change this to center.longitutde
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {/* Render clustered markers */}
        {loading ? null: clusters.map(cluster => {
          // Check if the cluster is null or undefined
          if (!cluster) return null;

          // Check if the cluster represents a single marker
          console.log(cluster.properties.point_count)
          if (cluster.properties.point_count === undefined) {
            return (
              <Marker
                key={cluster.properties.id}
                coordinate={{
                  latitude: cluster.geometry.coordinates[1],
                  longitude: cluster.geometry.coordinates[0],
                }}
                title={cluster.properties.title}
                description={cluster.properties.description}


              />
            );
          } else {
            // Render clustered markers
            return (
              <Marker
              key={cluster.id}
              title={`${cluster.properties.point_count} markers`}
              coordinate={{
                latitude: cluster.geometry.coordinates[1],
                longitude: cluster.geometry.coordinates[0],
              }}
            >
              {/* Custom view for clusters */}
              <View style={[styles.cluster, { width: 30, height: 30 }]}>
                <Text style={styles.clusterCount}>{cluster.properties.point_count}</Text>
              </View>
            </Marker>
            
            );
            
          }
        }
           
        
        )}
        <Marker
            key={"You are here"}
            coordinate={{
            latitude: center.latitude,
            longitude: center.longitude
            }}
            title={"You are here!"}
            // description={cluster.properties.description}
            // image={require('../AwesomeProject/assets/favicon.png')}
            image={require('../../assets/here.png')}

        />
      </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 140,
    },
    cluster: {
        borderRadius: 100,
        backgroundColor: '#334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clusterCount: {
        color: '#FFF',
        fontWeight: 'bold',
    }
});

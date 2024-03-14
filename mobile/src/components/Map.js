// import React from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, Dimensions, Image } from 'react-native';

// export default function Map() {
//     const API_URL = "http://localhost:8000"

//     const markers = [
//         {
//             id: '1',
//             name: 'Restaurant A',
//             fullAddress: '123 Main St, City, Country',
//             latitude: 51.505,
//             longitude: -0.07,
//             hours: {
//                 open: ['10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM'],
//                 close: ['8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM']
//             },
//             contact: {
//                 website: 'www.restaurantA.com',
//                 number: '123-456-7890'
//             }
//         },
//         {
//             id: '2',
//             name: 'Pharmacy B',
//             fullAddress: '456 Elm St, City, Country',
//             latitude: 51.52,
//             longitude: -0.1,
//             hours: {
//                 open: ['9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', 'Closed'],
//                 close: ['6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', 'Closed']
//             },
//             contact: {
//                 website: 'www.pharmacyB.com',
//                 number: '987-654-3210'
//             }
//         },
//         {
//             id: '3',
//             name: 'Gas Station C',
//             fullAddress: '789 Oak St, City, Country',
//             latitude: 51.51,
//             longitude: -0.08,
//             hours: {
//                 open: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours'],
//                 close: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours']
//             },
//             contact: {
//                 website: 'www.gasstationC.com',
//                 number: '555-123-4567'
//             }
//         },
//         {
//             id: '4',
//             name: 'Cafe D',
//             fullAddress: '789 Maple St, City, Country',
//             latitude: 51.51,
//             longitude: -0.11,
//             hours: {
//                 open: ['8:00 AM', '8:00 AM', '8:00 AM', '8:00 AM', '8:00 AM', '8:00 AM', '9:00 AM'],
//                 close: ['6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '5:00 PM']
//             },
//             contact: {
//                 website: 'www.cafeD.com',
//                 number: '333-555-7777'
//             }
//         },
//         {
//             id: '5',
//             name: 'Supermarket E',
//             fullAddress: '456 Walnut St, City, Country',
//             latitude: 51.52,
//             longitude: -0.1,
//             hours: {
//                 open: ['7:00 AM', '7:00 AM', '7:00 AM', '7:00 AM', '7:00 AM', '7:00 AM', '8:00 AM'],
//                 close: ['10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '9:00 PM']
//             },
//             contact: {
//                 website: 'www.supermarketE.com',
//                 number: '888-999-0000'
//             }
//         },
//         {
//             id: '6',
//             name: 'Hotel F',
//             fullAddress: '123 Oak St, City, Country',
//             latitude: 51.50,
//             longitude: -0.1,
//             hours: {
//                 open: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours'],
//                 close: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours']
//             },
//             contact: {
//                 website: 'www.hotelF.com',
//                 number: '111-222-3333'
//             }
//         },
//         {
//             id: '7',
//             name: 'Park G',
//             fullAddress: '345 Pine St, City, Country',
//             latitude: 51.501,
//             longitude: -0.09,
//             hours: {
//                 open: ['6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM'],
//                 close: ['10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM']
//             },
//             contact: {
//                 website: 'www.parkG.com',
//                 number: '777-888-9999'
//             }
//         },
//         {
//             id: '8',
//             name: 'Library H',
//             fullAddress: '678 Elm St, City, Country',
//             latitude: 51.52,
//             longitude: -0.12,
//             hours: {
//                 open: ['9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', 'Closed'],
//                 close: ['6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', 'Closed']
//             },
//             contact: {
//                 website: 'www.libraryH.com',
//                 number: '555-111-7777'
//             }
//         },
//         {
//             id: '9',
//             name: 'Gym I',
//             fullAddress: '910 Maple St, City, Country',
//             latitude: 51.53,
//             longitude: -0.08,
//             hours: {
//                 open: ['5:00 AM', '5:00 AM', '5:00 AM', '5:00 AM', '5:00 AM', '6:00 AM', '8:00 AM'],
//                 close: ['10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '9:00 PM', '6:00 PM']
//             },
//             contact: {
//                 website: 'www.gymI.com',
//                 number: '444-666-2222'
//             }
//         }]

//     let center = { latitude: 51.505, longitude: -0.09 };
//     const styles = StyleSheet.create({
//         map:{
//             width: Dimensions.get('window').width,
//             height: Dimensions.get('window').height * .50
//         },
//         markerImage: {
//             width: 20, // Adjust width as needed
//             height: 20, // Adjust height as needed
//         },
//     });

//     return (
//         <MapView
//             style={styles.map}
//             initialRegion={{
//                 latitude: center.latitude,
//                 longitude: center.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             }}
//         >
//             {markers.map((marker) => (
//                 <Marker
//                     key={marker.id}
//                     coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
//                     title={marker.name}
//                     description={marker.fullAddress}
//                 />
//             ))}

//             <Marker
//                 key={"You are here"}
//                 coordinate={center}
//                 title={"You are here!"}
//                 image={require('../../assets/here.png')} //./assets/navigation.png
//                 style={styles.markerImage}
//             />

//         </MapView>
//     );
// }

import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Dimensions, Alert } from "react-native";

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [center, setCenter] = useState(null);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          setMarkers(data.response);
          setLoading(false);
        } else {
          console.error("Error fetching washrooms:", data.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching washrooms:", error);
        setLoading(false);
      });
  }, []);

  let center = { latitude: 43.78309609, longitude: -79.1873263 };
  const styles = StyleSheet.create({
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
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
      {loading
        ? null
        : markers.map((marker) => (
            <Marker
              key={marker._id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
              description={marker.fullAddress}
            />
          ))}

      <Marker
        key={"You are here"}
        coordinate={center}
        title={"You are here!"}
        image={require("../../assets/here.png")} //./assets/navigation.png
        // Attribute: "https://www.flaticon.com/free-icons/my-location" title="my location icons">My location icons created by zero_wing - Flaticon</a>
      />
    </MapView>
    // <WashroomBottomSheet/>
    // </View>
  );
}

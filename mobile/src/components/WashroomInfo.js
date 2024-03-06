// WashroomInfo.js

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useBottomSheet } from '@gorhom/bottom-sheet';

const WashroomInfo = () => {
  const { dismiss } = useBottomSheet();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Washroom Information</Text>
      </View>
      <View style={styles.content}>
        <Text>Details about the washroom go here...</Text>
      </View>
      <View style={styles.footer}>
        <Button title="Close" onPress={dismiss} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 8,
  },
});

export default WashroomInfo;
// import "react-native-gesture-handler";
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Button} from 'react-native';

// export default washroomInfo = () => {
//   return (
//       <View style={styles.container}>
//         <View style={styles.search}>
//             <Text>Search for a place or address</Text>
//         </View>
//         <View style={styles.washroomNearby}>
//           <Text style={styles.text}>WASHROOMS NEARBY</Text>
//         </View>
//         <StatusBar style="auto" />
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: 'gray',
//   },
//   search: {
//     height:'10%',
//     alignItems: 'left',
//     backgroundColor: 'red'
//   },
//   washroomNearby: {
//     flex: 1,
//     alignItems: 'left',
//     backgroundColor: 'white'
//   },
//   text: {
//     fontSize: 20,
//   }
// });


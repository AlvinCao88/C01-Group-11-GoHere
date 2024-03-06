import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const WashroomInfoScreen = () => {
  const washroomName = "Student Center";
  const address = "123";

  return (
    <View style={styles.container}>
        <View style={styles.container}>
        <View style={styles.nameContainer}>
            <Text> washroomName </Text>
            <View>
                <Text> address </Text>
            </View>
        </View>
        <View>
            <Text> Contact</Text>
        </View>
        
        
        </View>
        <View style={styles.container2}>
            <Text> Get Direction</Text>
        </View>
        <StatusBar style="auto" />

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        width: "auto",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
  container1: {
    flex: 1,
    width: "auto",
    backgroundColor: 'blue',
  },
  container2: {
    width: "auto",
    backgroundColor: 'blue',
  },
    nameContainer: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default WashroomInfoScreen;

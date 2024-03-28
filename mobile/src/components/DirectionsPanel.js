import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions, 
  Linking,
} from "react-native";
import { getGlobalWashroom } from './GlobalWashroomContext';

const DirectionsPanel = () => {
  const { currentWashroom } = getGlobalWashroom();
  const handleGetDirections = async () => {
    if (!currentWashroom) return;
    const appLink = `googlemaps://?daddr=${currentWashroom.latitude},${currentWashroom.longitude}&directionsmode=driving`;
    const browserLink = `https://www.google.com/maps/dir/?api=1&destination=${currentWashroom.latitude},${currentWashroom.longitude}`;
  
    try {
      const canOpenApp = await Linking.canOpenURL(appLink);
      if (canOpenApp) {
        await Linking.openURL(appLink);
      } else {
        await Linking.openURL(browserLink);
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.panelBackground}>
        <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -90,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.075,
    shadowRadius: 15,
    elevation: 8,
  },
  panelBackground: {
    backgroundColor: "white",
    width: width,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 100,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12.5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "90%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DirectionsPanel;

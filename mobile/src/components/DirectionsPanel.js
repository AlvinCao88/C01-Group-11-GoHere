import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const DirectionsPanel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.panelBackground}>
        <TouchableOpacity style={styles.button}>
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

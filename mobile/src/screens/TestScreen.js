import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function TestScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Hello World</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddWashroomScreen")}
      >
        <Text style={styles.buttonText}>Add New Washroom</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Card")}
      >
        <Text style={styles.buttonText}>Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DonationScreen")}
      >
        <Text style={styles.buttonText}>Donate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#DA5C59",
    width: "80%",
    padding: 15,
    borderRadius: 0,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

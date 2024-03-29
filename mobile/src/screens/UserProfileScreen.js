import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import BackButton from "../components/BackButton";

const UserProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    const loadStoredData = async () => {
      const storedFirstName = await AsyncStorage.getItem("firstName");
      const storedLastName = await AsyncStorage.getItem("lastName");
      if (storedFirstName) setFirstName(storedFirstName);
      if (storedLastName) setLastName(storedLastName);
    };

    loadStoredData();
  }, []);

  const saveData = async () => {
    if (condition != "") {
      try {
        await AsyncStorage.setItem("firstName", firstName);
        await AsyncStorage.setItem("lastName", lastName);
        await AsyncStorage.setItem("condition", condition);
        navigation.goBack();
      } catch (error) {
        console.error("Failed to save the data to storage", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <BackButton
          text="Back"
          styleButton={styles.backButton}
          styleText={styles.backButtonText}
        />
        <Text style={styles.headerTitle}>My Profile</Text>
      </TouchableOpacity>
      <View style={styles.dividingLine}></View>
      <View style={styles.mainContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
        />
        <Text style={styles.label}>Health Condition</Text>
        <RNPickerSelect
          placeholder={{
            label: "Make sure to select your health condition",
            value: "",
          }}
          onValueChange={setCondition}
          items={[
            { label: "Crohn's disease", value: "Crohn's disease" },
            { label: "Ulcerative colitis", value: "Ulcerative colitis" },
          ]}
          style={pickerSelectStyles}
        />
        <TouchableOpacity
          style={[styles.button, condition !== "" && styles.buttonActive]}
          onPress={saveData}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 0,
    backgroundColor: "white",
  },
  mainContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    height: 40,
    marginTop: 8,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    width: "90%",
    alignSelf: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 20,
    color: "#5A5A5A",
    fontSize:18,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#999999",
    width: "90%",
    padding: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderRadius: 8,
  },
  buttonActive: {
    backgroundColor: "#DA5C59",
  },
  saveText: {
    color: "white",
    fontWeight: "500",
  },
  backButton: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "flex-start",
    alignItems: "center",
    width: "18%",
  },
  backButtonText: {
    fontSize: 16,
  },
  dividingLine: {
    marginTop: 10,
    borderBottomColor: "#B7B7B7",
    borderBottomWidth: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  headerTitle: {
    position: "absolute",
    width: Dimensions.get("window").width,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    paddingTop: 15,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
};

export default UserProfileScreen;

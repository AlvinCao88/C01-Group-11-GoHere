import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const screenHeight = Dimensions.get("window").height;
const Popup = ({ visible, message, onHide }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          if (onHide) {
            onHide();
          }
        });
      }, 3000);
    }
  }, [visible, slideAnim, onHide]);

  const bottomStart = screenHeight - 200;
  const bottomEnd = screenHeight - 500;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.centeredView}>
        <Animated.View
          style={[
            styles.modalView,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [bottomStart, bottomEnd],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.modalText}>{message}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function AddBusinessScreen({ navigation }) {
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  const isFormComplete =
    address &&
    city &&
    province !== "" &&
    province !== "Select a province" &&
    description;

  const handleSubmit = async () => {
    if (isFormComplete) {
      const washroomRequest = {
        businessName,
        contactName,
        phoneNumber,
        address,
        email,
        city,
        province,
        description,
      };
      
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/request/addBusinessRequest`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(washroomRequest),
          },
        );

        if (response.ok) {
          console.log("Business request submitted successfully");
          setPopupVisible(true);
        } else {
          const resData = await response.text();
          console.error("Failed to submit washroom request:", resData);
        }
      } catch (error) {
        console.error("Error submitting washroom request:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={{ fontSize: 24, color: "#FF6347" }}>&lt;</Text>
      </TouchableOpacity>
      <View style={styles.dividingLine}></View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.inputContainer}>
        <Text style={styles.solidText}>Business Name</Text>
          <TextInput
            placeholder="Enter Business Name"
            value={businessName}
            onChangeText={setBusinessName}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <Text style={styles.spaceText}> </Text>
          <Text style={styles.solidText}>Contact Name</Text>
          <TextInput
            placeholder="Enter Contact Name"
            value={contactName}
            onChangeText={setContactName}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <Text style={styles.spaceText}> </Text>
          <Text style={styles.solidText}>Email</Text>
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <Text style={styles.spaceText}> </Text>
          <Text style={styles.solidText}>Phone Number</Text>
          <TextInput
            placeholder="Enter the address"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType = 'numeric'
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <Text style={styles.spaceText}> </Text>
          <Text style={styles.solidText}>Address</Text>
          <TextInput
            placeholder="Enter the address"
            value={address}
            onChangeText={setAddress}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <Text style={styles.spaceText}> </Text>
          <Text style={styles.solidText}>City</Text>
          <TextInput
            placeholder="Enter the city"
            value={city}
            onChangeText={setCity}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <Text style={styles.spaceText}> </Text>
          <Text style={styles.solidText}>Province</Text>
          <Text style={styles.superSpaceText}> </Text>
          <Text style={styles.superSpaceText}> </Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              placeholder={{ label: "Select a province", value: "" }}
              onValueChange={setProvince}
              items={[
                { label: "Alberta", value: "Alberta" },
                { label: "British Columbia", value: "British Columbia" },
                { label: "Manitoba", value: "Manitoba" },
                { label: "New Brunswick", value: "New Brunswick" },
                {
                  label: "Newfoundland and Labrador",
                  value: "Newfoundland and Labrador",
                },
                { label: "Nova Scotia", value: "Nova Scotia" },
                { label: "Ontario", value: "Ontario" },
                {
                  label: "Prince Edward Island",
                  value: "Prince Edward Island",
                },
                { label: "Quebec", value: "Quebec" },
                { label: "Saskatchewan", value: "Saskatchewan" },
              ]}
              style={pickerSelectStyles}
            />
          </View>
          <Text style={styles.spaceText}> </Text>
          <Text style={styles.solidText}>Description</Text>
          <TextInput
            placeholder="Enter a brief description"
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isFormComplete}
          style={[
            styles.submitButton,
            isFormComplete
              ? styles.submitButtonActive
              : styles.submitButtonInactive,
          ]}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <Popup
        visible={popupVisible}
        message="Request submitted."
        onHide={() => setPopupVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "#FF6347",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 15,
    padding: 10,
    zIndex: 10,
  },
  dividingLine: {
    marginTop: 50,
    borderBottomColor: "#B0B0B0",
    borderBottomWidth: 1,
    width: "100%",
  },
 
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  solidText: {
    fontSize: 16,
    color: "#FF6347",
    marginLeft: 25,
    marginBottom: 5,
  },
  spaceText: {
    fontSize: 10,
  },
  superSpaceText: {
    fontSize: 2,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#FF6347",
    padding: 5,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    fontSize: 16,
    color: "#000",
  },
  submitButton: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
  },
  submitButtonInactive: {
    backgroundColor: "#B0B0B0",
  },
  submitButtonActive: {
    backgroundColor: "#FF6347",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: "#FF6347",
    paddingBottom: 5,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  inputIOS: {
    fontSize: 16,
    color: "black",
    paddingLeft: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
});

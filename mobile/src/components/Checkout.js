import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

const Checkout = ({ navigation }) => {
  const stripe = useStripe();
  const [customAmount, setCustomAmount] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Custom Amount");

  const handleCustomAmountChange = (text) => {
    setCustomAmount(text);
  };

  const donate = async (amount) => {
    try {
      const finalAmount = parseFloat(amount).toFixed(2); //limit to 2 decimal places
      if (finalAmount <= 0) {
        return Alert.alert("You cannot donate 0 or negative dollars.");
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/donate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: finalAmount }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return Alert.alert(data.message);
      }

      // PaymentSheet will handle the process of entering card details and such
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "GoHere donation", //this is a piece of required info for initPayment
        //TODO: may need to change this
      });

      if (initSheet.error) {
        return Alert.alert(initSheet.error.message);
      }

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });

      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }

      // letting the user know it was successful
      Alert.alert("Thank you for the donation.");
    } catch (err) {
      console.error(err);
      Alert.alert("Payment failed.");
    }
  };

  return (
    <View>
      <StatusBar style="light" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/IMG_2348.jpg")} // Assuming you have a logo image
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.heading}>Support Our Cause</Text>
      <View style={styles.amountButtonsContainer}>
        <TouchableOpacity
          style={styles.amountButton}
          onPress={() => {
            donate("1");
          }}
        >
          <Text style={styles.amountButtonText}>$1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.amountButton}
          onPress={() => {
            donate("5");
          }}
        >
          <Text style={styles.amountButtonText}>$5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.amountButton}
          onPress={() => {
            donate("20");
          }}
        >
          <Text style={styles.amountButtonText}>$20</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.customAmountContainer}>
        <TextInput
          style={styles.customAmountInput}
          placeholder={placeholderText}
          keyboardType="numeric"
          value={customAmount}
          onChangeText={handleCustomAmountChange}
        />
        <TouchableOpacity
          style={styles.customAmountButton}
          onPress={() => {
            donate(customAmount);
          }}
        >
          <Text style={styles.customAmountButtonText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // white background
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: "#FF6347", // red color
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF6347", // red color
  },
  amountButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  amountButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  amountButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  customAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  customAmountInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  customAmountButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  customAmountButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
export default Checkout;

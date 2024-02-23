import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {StripeProvider} from "@stripe/stripe-react-native";

import TestScreen from "./src/screens/TestScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import Checkout from "./src/components/Checkout";

const STRIPE_PUBLBISHABLE_KEY = "pk_test_51Omh0XD4UdDQFwxRIjqyccC4UN8VXKH40AZkVufSYAKJIPaVqPMJbDatDAnMfATvniF1JB98uS71ahxwqTRnHB0s00wjzaO9Jm";
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StripeProvider publishableKey="pk_test_51Omh0XD4UdDQFwxRIjqyccC4UN8VXKH40AZkVufSYAKJIPaVqPMJbDatDAnMfATvniF1JB98uS71ahxwqTRnHB0s00wjzaO9Jm">
        <Checkout />
      </StripeProvider>
    </View> 
  );
  
};

/*
<View style={styles.container}>
      <StatusBar style="dark" />
      <StripeProvider publishableKey="pk_test_51Omh0XD4UdDQFwxRIjqyccC4UN8VXKH40AZkVufSYAKJIPaVqPMJbDatDAnMfATvniF1JB98uS71ahxwqTRnHB0s00wjzaO9Jm">
        <Checkout />
      </StripeProvider>
    </View> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
});

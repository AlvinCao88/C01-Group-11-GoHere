import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {StripeProvider} from "@stripe/stripe-react-native";

import Checkout from "../components/Checkout";

export default function DonationScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StripeProvider publishableKey="pk_test_51Omh0XD4UdDQFwxRIjqyccC4UN8VXKH40AZkVufSYAKJIPaVqPMJbDatDAnMfATvniF1JB98uS71ahxwqTRnHB0s00wjzaO9Jm">
        <Checkout />
      </StripeProvider>
    </View> 
  );
  
};

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
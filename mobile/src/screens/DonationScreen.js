import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";

import Checkout from "../components/Checkout";

export default function DonationScreen() {
  console.log(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      >
        <Checkout />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

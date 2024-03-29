import { useNavigation } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import { Keyboard, SafeAreaView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import BackButton from '../components/BackButton';

import Checkout from '../components/Checkout';

export default function DonationScreen() {
  const navigation = useNavigation();
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <BackButton text="Back" styleButton={styles.backButton} styleText={styles.backButtonText} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
          <Checkout />
        </StripeProvider>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
  },
  header: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
  },
});
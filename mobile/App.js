import React from "react";
import TestScreen from "./src/screens/TestScreen";
import AddWashroomScreen from "./src/screens/AddWashroomScreen";
import Card from "./src/screens/CardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DonationScreen from "./src/screens/DonationScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="AddWashroomScreen" component={AddWashroomScreen} />
        <Stack.Screen name="DonationScreen" component={DonationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

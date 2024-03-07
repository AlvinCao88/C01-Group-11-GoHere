import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";

import MapScreen from "./src/screens/MapScreen";
import NewsScreen from "./src/screens/NewsScreen";
import CardScreen from "./src/screens/CardScreen";
import TestScreen from "./src/screens/TestScreen";
import DonationScreen from "./src/screens/DonationScreen";
import AddWashroomScreen from "./src/screens/AddWashroomScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PrismicProvider client={client}>
      <NavigationContainer>
        <StatusBar />
        <Tab.Navigator initialRouteName="Map">
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="News"
            component={NewsScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Card"
            component={CardScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Info"
            component={InfoNavigator}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PrismicProvider>
  );
}

function InfoNavigator() {
  return (
    <Stack.Navigator initialRouteName="Test">
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Donate"
        component={DonationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddWashroom"
        component={AddWashroomScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

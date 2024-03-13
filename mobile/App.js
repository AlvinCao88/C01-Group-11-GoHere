import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapScreen from "./src/screens/MapScreen";
import CardScreen from "./src/screens/CardScreen";
import TestScreen from "./src/screens/TestScreen";
import DonateScreen from "./src/screens/DonationScreen";
import AddWashroomsScreen from "./src/screens/AddWashroomScreen";
import InfoScreen from "./src/screens/InfoScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function InfoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="Donate" component={DonateScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Tab.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Card" component={CardScreen} />
        <Tab.Screen name="Info" component={InfoStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
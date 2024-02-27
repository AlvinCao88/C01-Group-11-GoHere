// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapScreen from "./src/screens/MapScreen";
import TestScreen from "./src/screens/TestScreen";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map">
        <Tab.Screen
          name = "Map"
          component={MapScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name = "Test"
          component={TestScreen}
          options={{headerShown: false}}
        />

      </Tab.Navigator>

    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

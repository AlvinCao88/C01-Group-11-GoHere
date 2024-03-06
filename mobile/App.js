import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapScreen from "./src/screens/MapScreen";
import TestScreen from "./src/screens/TestScreen";
import WashroomBottomSheet from "./src/components/WashroomBottomSheet";
import WashroomInfoScreen from "./src/screens/WashroomInfoScreen";


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
         <Tab.Screen
          name = "Washroom Info Screen"
          component={WashroomInfoScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name = "bottom Sheet screen"
          component={WashroomBottomSheet}
          options={{headerShown: false}}
        />

      </Tab.Navigator>

    </NavigationContainer>
  );
}

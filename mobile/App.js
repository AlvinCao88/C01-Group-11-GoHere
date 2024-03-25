import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NewsScreen from "./src/screens/NewsScreen";
import DetailedNewsScreen from "./src/screens/DetailedNewsScreen";
import CardScreen from "./src/screens/CardScreen";
import DonateScreen from "./src/screens/DonationScreen"
import InfoScreen from "./src/screens/InfoScreen";
import SettingScreen from "./src/screens/SettingScreen";
import { NavigationStateProvider } from "./src/components/NavigationStateContext"

import AddWashroomScreen from "./src/screens/AddWashroomScreen";
import MapScreen from "./src/screens/MapScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationStateProvider>
    <PrismicProvider client={client}>
      <NavigationContainer>
        <StatusBar />
        <Tab.Navigator
          initialRouteName="Explore"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Card') {
                return <MaterialCommunityIcons name="card-account-details" size={size} color={color} />;
              } else {
                let iconName;
                if (route.name === 'Settings') {
                  iconName = focused ? 'settings-sharp' : 'settings-sharp';
                } else if (route.name === 'Explore') {
                  iconName = focused ? 'search-outline' : 'search-outline';
                } else if (route.name === 'Info') {
                  iconName = focused ? 'information-circle' : 'information-circle';
                } else if (route.name === 'News') {
                  return <MaterialIcons name="newspaper" size={size} color={color} />;
                } 
                return <Ionicons name={iconName} size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: '#DA5C59',
            tabBarInactiveTintColor: '#5A5A5A',
          })}
        >
          <Tab.Screen
            name="Explore"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="News"
            component={NewsNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Card"
            component={CardScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Info"
            component={InfoStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingStack}
            options={{ headerShown: false}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PrismicProvider>
    </NavigationStateProvider>
  );
}

function NewsNavigator() {
  return (
    <Stack.Navigator initialRouteName="News List">
      <Stack.Screen
        name="News List"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detailed News"
        component={DetailedNewsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function InfoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
      <Stack.Screen name="Donate" component={DonateScreen} />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator initialRouteName="SettingsPage" screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingsPage" component={SettingScreen} />
      <Stack.Screen name="AddWashrooms" component={AddWashroomScreen} />
    </Stack.Navigator>
  )
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar />
//       <Tab.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
//         <Tab.Screen name="Map" component={MapScreen} />
//         <Tab.Screen name="Card" component={CardScreen} />
//         <Tab.Screen name="Info" component={InfoStack} />
//         <Tab.Screen name="Settings" component={SettingStack} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

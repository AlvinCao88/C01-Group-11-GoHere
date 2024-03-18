import React  from 'react';
import { View, StyleSheet } from 'react-native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WashroomList from './WashroomList';
import WashroomInfo from './WashroomInfo';
import WashroomSearch from './WashroomSearch';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();
const NavigateBottomSheets = () => {

  return (
    
    <NavigationContainer independent={true}>
      <Stack.Navigator >
        <Stack.Screen
            name="WashroomList"
            component={WashroomList}
            options={{headerShown:false}}
        />
        <Stack.Screen 
            name="WashroomInfo" 
            component={WashroomInfo} 
            options={{headerShown:false}}
        />
        <Stack.Screen 
            name="WashroomSearch" 
            component={WashroomSearch} 
            options={{headerShown:false}}
        />
        <Stack.Screen 
            name="MapScreen" 
            component={MapScreen} 
            options={{headerShown:false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default NavigateBottomSheets;
import React  from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WashroomList from './WashroomList';
import WashroomInfo from './WashroomInfo';
import WashroomSearch from './WashroomSearch';
import ReportIssueScreen from '../screens/ReportIssueScreen';
import WashroomBookmarksList from '../screens/WashroomBookmarksList';

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
          name="ReportIssueScreen"
          component={ReportIssueScreen}
        />
        
        <Stack.Screen
          name="WashroomBookmarks"
          component={WashroomBookmarksList}
          options={{headerShown:false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default NavigateBottomSheets;

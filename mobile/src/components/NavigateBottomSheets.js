import React, { forwardRef }  from 'react';
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

const NavigateBottomSheets = forwardRef(function ({sheetRef, setCenter}, ref) {
  return (
    <NavigationContainer independent={true} ref={ref}>
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
            initialParams={{sheetRef: sheetRef, setCenter: setCenter}}
        />
        <Stack.Screen 
            name="WashroomSearch" 
            component={WashroomSearch} 
            options={{headerShown:false}}
            initialParams={{sheetRef: sheetRef}}

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
});


export default NavigateBottomSheets;

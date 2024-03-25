import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useCallback, useRef, useMemo, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Button, TextInput, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import BottomSheet, {  BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MapScreen from "../screens/MapScreen";
import NavigateBottomSheets from "./NavigateBottomSheets";
import DirectionsPanel from "../components/DirectionsPanel"
import { useNavigationState } from '../components/NavigationStateContext';

export default WashroomBottomSheet = () => {
  // ref
  const sheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['12%', '30%', '90%'], []);
  //callback 

  const { isWashroomInfoFocused } = useNavigationState();
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <MapScreen/> 
          {/** This is to have the map screen with the bottom sheet */}
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
          >
         <NavigateBottomSheets/>
        </BottomSheet>
        <StatusBar style="auto" />
        </View>
        {isWashroomInfoFocused && <DirectionsPanel />}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
  },
  search: {
    height:'10%',
    alignItems: 'left',
    backgroundColor: 'white'
  },
  washroomNearby: {
    // flex: 1,
    alignItems: 'left',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    borderBottomStyle: 'solid',
  },
  text: {
    fontSize: 12,
    color:'red',
    fontWeight:'500',
    padding: 10,
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#D3D3D3',
    borderRadius:5
    
  },
  washroomList: {
    // height: 20,
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
    // alignContent:'center',
    // alignItems:'center',
    backgroundColor: 'white',
    padding: 10,
  },
  washroomName:{
    fontSize: 14,
    fontWeight: '600',
  },
});


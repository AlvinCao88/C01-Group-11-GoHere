import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useCallback, useRef, useMemo, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import BottomSheet, {  BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import washroomInfo from "./WashroomInfo";
import MapScreen from "../screens/MapScreen";

export default WashroomBottomSheet = () => {

  // ref
  const sheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['10%', '30%', '80%'], []);
  //callback 
  const handleWashroomInfoPress = useCallback(() => {
    sheetRef.current.snapToIndex(1); // Snap to the second sheet (30%)
  }, []);
  // renders
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        >
        <View style={styles.search}>
            <Text>Search for a place or address</Text>
        </View>
        <View style={styles.washroomNearby}>
          <Text style={styles.text}>WASHROOMS NEARBY</Text>
        </View>
        <View style={styles.washroomNearby}>
          <Button 
            onPress={handleWashroomInfoPress}
            title="Washroom one"
            color="red"
            accessibilityLabel="Learn more about this purple button"/>
        </View>
      </BottomSheet>
      <StatusBar style="auto" />
      </View>

    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  search: {
    height:'10%',
    alignItems: 'left',
    backgroundColor: 'red'
  },
  washroomNearby: {
    flex: 1,
    alignItems: 'left',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20,
  }
});


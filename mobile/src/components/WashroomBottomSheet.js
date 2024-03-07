import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useCallback, useRef, useMemo, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Button, TextInput, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import BottomSheet, {  BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import washroomInfo from "./WashroomInfo";
import MapScreen from "../screens/MapScreen";

export default WashroomBottomSheet = () => {
  const [text, onChangeText] = React.useState('Search for a place or address');
  
  const [loading, setLoading] = useState(true);
  const [washrooms, setWashrooms] = useState([]);

  useEffect(() => {
    const getWashrooms = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms`);
        if (!response.ok) {
          console.log("Server failed:", response.status);
        } else {
          const data = await response.json();
          setWashrooms(data.response);
        }
      } catch (error) {
        console.log("Fetch function failed:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getWashrooms();
  }, []);

  const renderItem = useCallback((washroom) => {
    return (
      <TouchableOpacity key={washroom._id} style={styles.washroomList} onPress={handleWashroomInfoPress}>
        <Text style={styles.washrooomName}>{washroom.name}</Text>
        <Text style={{fontSize: 12, fontWeight:'300' }}>{washroom.fullAddress}, {washroom.province}</Text>
      </TouchableOpacity>
    );
  }, []);
  // ref
  const sheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['12%', '30%', '90%'], []);
  //callback 
  const handleWashroomInfoPress = useCallback(() => {
    sheetRef.current.snapToIndex(2); // Snap to the second sheet (30%)
  }, []);
  
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
       
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.washroomNearby}>
          <Text style={styles.text}>WASHROOMS NEARBY</Text>
        </View>
         <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          
         {loading ? (
        <ActivityIndicator color={"red"} size='large'/>
      ) : (
        washrooms.map(renderItem)
      )}

        </BottomSheetScrollView>
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
    borderBottomWidth: 1, // Adjust the border width as needed
    borderBottomColor: '#D3D3D3', // Adjust the border color as needed
    borderBottomStyle: 'solid', // You can also use 'dotted' or 'dashed'
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
  washrooomName:{
    fontSize: 14,
    fontWeight: '600',
  },
});


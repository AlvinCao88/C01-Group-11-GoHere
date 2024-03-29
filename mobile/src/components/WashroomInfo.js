import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigationState } from '../components/NavigationStateContext';
import BackButton from '../components/BackButton'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getGlobalWashroom } from '../components/GlobalWashroomContext';

const WashroomInfo = ( {route, navigation}) => {
  const isFocused = useIsFocused();
  const { setIsWashroomInfoFocused } = useNavigationState();
  const { setWashroom } = getGlobalWashroom();

  useEffect(() => {
    setIsWashroomInfoFocused(isFocused);
  }, [isFocused, setIsWashroomInfoFocused]);
  
  const {id, sheetRef, setCenter} = route.params;
  const [washroom, setWashroomLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inBookmarks, setInBookmarks] = useState(true);
  // console.log(sheetRef);
  useEffect(() => {
    sheetRef.current.expand()
  }, [])

  
  useEffect(() => {
    const getWashroom = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms/${id}`);
        if (!response.ok) {
          console.log("Server failed:", response.status);
          return;
        }
        const data = await response.json();
        setWashroomLocal(data.response);
        setWashroom(data.response);
        setCenter({
          latitude: data.response.latitude,
          longitude: data.response.longitude,
          longitudeDelta: 0.005,
          latitudeDelta: 0.005,
        });
      } catch (error) {
        console.error("Fetch function failed:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkInBookmarks = async () => {
      try {
        const bookmarks = JSON.parse(await AsyncStorage.getItem("bookmarks"));
        // Check whether washroom is in list
        if (!bookmarks || !bookmarks.some((e) => e._id === id))
          setInBookmarks(false)
        console.log(bookmarks)
      }
      catch (e) {
        console.log(e)
      }
    }
  
    getWashroom();
    checkInBookmarks();
  }, [id, setCenter]);

const handleWebsitePress = useCallback(async () => {
  const url = washroom?.contact?.website;
  if (!url) {
    Alert.alert('This washroom does not have a website.');
    return;
  }
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    Alert.alert('Error. Unable to open the URL.');
  }
}, [washroom]);

const handleCallPress = useCallback(async () => {
  const phoneNumber = washroom?.contact?.number;
  if (!phoneNumber) {
    Alert.alert('This washroom does not have a phone number listed.');
    return;
  }
  
  const canOpen = await Linking.canOpenURL(`tel:${phoneNumber}`);
  if (canOpen) {
    await Linking.openURL(`tel:${phoneNumber}`);
  } else {
    Alert.alert('Error. Unable to call the phone number.');
  }
}, [washroom]);

  const handleSaveWashroom = async (value) => {
    try {
      const bookmarks = JSON.parse(await AsyncStorage.getItem("bookmarks"));
      if (!bookmarks) {
        await AsyncStorage.setItem("bookmarks", JSON.stringify([{
          _id: value._id,
          name: value.name,
          fullAddress: value.fullAddress,
          province: value.province
        }]))
      }
      else {
        await AsyncStorage.setItem("bookmarks", JSON.stringify([...bookmarks, {
          _id: value._id,
          name: value.name,
          fullAddress: value.fullAddress,
          province: value.province
        }]))
      }
      setInBookmarks(true);
    }
    catch (e) {
      console.error(e)
    }
  }
  
  const handleUnsaveWashroom = async (value) => {
    try {
      const bookmarks = JSON.parse(await AsyncStorage.getItem("bookmarks"));
      if (bookmarks) {
        // remove washroom from bookmarks
        await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks.filter((e) => e._id !== value)))
      }
      setInBookmarks(false);
    }
    catch (e) {
      console.error(e)
    }
  }
    
  return (
    <BottomSheetScrollView style={styles.container}  >

      {loading  ? (
            <ActivityIndicator color={"red"} size='large'/>
            ) : ( washroom ? 
              <View style={styles.container}>
                <View style={styles.infoSection}>
                  <View style={styles.header}>
                    <View style={styles.titleContainer}>
                    <Text style={styles.name}>{washroom.name}</Text> 
                    </View>
                    <View style={styles.buttonContainer}>
                      <BackButton text="Back" styleButton={styles.backButton} styleText={styles.backButtonText} />
                    </View>
                  </View>
                  <Text style={styles.washroomContent}>{washroom.fullAddress}</Text> 
                  <View >
                    {inBookmarks ?
                    <TouchableOpacity style={styles.saveButton} onPress={() => handleUnsaveWashroom(id)}>
                      <MaterialIcons name="bookmark" size={24} color={"red"} />
                      <Text style={styles.saveText}>Unsave</Text>
                    </TouchableOpacity>
                      :
                    <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveWashroom(washroom)}>
                      <MaterialIcons name="bookmark-outline" size={24} color={"red"} />
                      <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                    }
                  </View>
                  <Text style={styles.sectionTitle}>Open hours</Text>
                  <View>
                    {washroom.hours.map((hours, index) => {
                      const [day, time] = hours.split(': ');
                      return(
                      <View key={index} style={styles.hourContainer}>
                        <Text style={styles.day}>{day}</Text>
                        <Text style={styles.time}>{time}</Text>
                      </View>
                      )
                    }
                    )}
                  </View>
                  
                  <Text style={styles.sectionTitle}>Contact</Text>
                  <View style={styles.contactView}>
                    <TouchableOpacity style={styles.websiteButton} onPress={handleWebsitePress}>
                        <Text style={styles.contactText}>Website</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
                        <Text style={styles.contactText}>Call</Text>
                      </TouchableOpacity>
                    </View>
                  
                  <Text style={styles.sectionTitle}>Photos</Text>
                  <View style={styles.contactView}>
                    
                  </View>
                  <Text style={styles.sectionTitle}>Report</Text>
                  <View style={styles.contactView}>
                    <TouchableOpacity 
                      style={styles.reportButton}
                      onPress={() => navigation.navigate("ReportIssueScreen", {washroomId: id})}
                    >
                      <Text style={styles.reportText}>Report a Washroom</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
              </View>
            
            : 
            null)
      }
      <View style={styles.directionView}>
        <TouchableOpacity style={styles.directionButton}>
          <Text style={styles.directionText}>Get Direction</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
  },
  infoSection: {
    height:'80%',
    backgroundColor: 'white',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  washroomContent: {
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 15,
  },
  saveButton:{
    backgroundColor:'white',
    borderColor: '#efefef',
    borderWidth: 1,
    padding: 10,
    width: 100,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  saveText:{
    color: 'red',
    fontSize: 14,
    fontWeight: '400',
  },
  sectionTitle:{
    marginTop: 20,
    color: 'red', 
    fontWeight: '400', 
    fontSize: 16,
  },
  contactView:{
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  websiteButton:{
    backgroundColor:'#efefef',
    padding:15,
    width: '50%',
    alignItems: 'center',
    borderRadius: 10,
  },
  callButton:{
    backgroundColor:'#efefef',
    padding:15,
    width: '30%',
    alignItems: 'center',
    borderRadius: 10,
  },
  contactText:{
    fontSize: 16,
    fontWeight: '400',
  },
  directionView:{
    justifyContent:'flex-end',
    alignItems:'center',
    padding: 10
  },
  directionButton:{
    backgroundColor:'white',
    padding:20,
    width: "90%",
  },
  directionText:{
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  hourContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  day: {
    fontSize: 14,
    fontWeight: '400',
  },
  time: {
    fontSize: 14,
  },
  reportButton: {
    backgroundColor: '#d64c49',
    width: '95%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  reportText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  backButtonText: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  titleContainer: {
    width: '80%',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
});

export default WashroomInfo;

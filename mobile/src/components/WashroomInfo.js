import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  TouchableOpacity, 
  ActivityIndicator } from 'react-native';
import {   BottomSheetScrollView } from "@gorhom/bottom-sheet";

const WashroomInfo = ( {route, nativation}) => {
  const {id} = route.params;
  const [washroom, setWashroom] = useState(null);
  const [loading, setLoading] = useState(true);

  const sheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => [ '30%', '90%'], []);
  //callback 
  
  useEffect(() => {
    const getWashroom = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query//washrooms/${id}`);
        if (!response.ok) {
          // console.log("Server failed:", response.status);
        } else {
          const data = await response.json();
          setWashroom(data.response);
          // console.log(data);
        }
      } catch (error) {
        console.log("Fetch function failed:", error);
      } finally {
        setLoading(false);
      }
    };
  
    getWashroom();
  }, []);

  
  // const handleWebsitePress = useCallback(async () => {
  //   if (!washroom || !washroom.website) {
  //     // Handle the case where washroom or washroom.website is null or undefined
  //     console.error('Invalid washroom or website property');
  //     return;
  //   }
  
  //   const supported = await Linking.canOpenURL(washroom.website);
  
  //   if (supported) {
  //     await Linking.openURL(washroom.website);
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${washroom.website}`);
  //   }
  // }, [washroom]);
  
  
    
  return (
    <BottomSheetScrollView style={styles.container}  >
      {loading  ? (
            <ActivityIndicator color={"red"} size='large'/>
            ) : ( washroom ? 
              <View style={styles.container}>
                <View style={styles.infoSection}>
                  <Text style={styles.name}>{washroom.name}</Text> 
                  <Text style={styles.washroomContent}>{washroom.fullAddress}</Text> 
                  <View >
                    <TouchableOpacity style={styles.saveButton}>
                      <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity style={styles.websiteButton} >
                        <Text style={styles.contactText}>Website</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.callButton}>
                        <Text style={styles.contactText}>Call</Text>
                      </TouchableOpacity>
                    </View>
                  
                  <Text style={styles.sectionTitle}>Photos</Text>
                  <View style={styles.contactView}>
                    
                  </View>
                  <Text style={styles.sectionTitle}>Report</Text>
                  <View style={styles.contactView}>
                    <TouchableOpacity style={styles.saveButton}>
                      <Text style={styles.saveText}>Report a Washroom</Text>
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
    // height:'80',
    flex:1,
    backgroundColor:'white',
    // padding: 10,
  },
  infoSection: {
    height:'80%',
    backgroundColor: 'white',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    // padding:10,
    marginBottom: 10
  },
  washroomContent: {
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 15,
    // padding:5,
  },
  saveButton:{
    backgroundColor:'white',
    borderColor: '#efefef',
    borderWidth: 1,
    padding:15,
    width: 90,
    alignItems: 'center',
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
    // justifyContent: 'center',
  },
  directionView:{
    justifyContent:'flex-end',
    alignItems:'center',
    padding: 10
  },
  directionButton:{
    backgroundColor:'black',
    borderColor: '#efefef',
    borderWidth: 1,
    padding:15,
    width: "90%",
    // alignItems: 'center',
    borderRadius: 10,
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
});

export default WashroomInfo;

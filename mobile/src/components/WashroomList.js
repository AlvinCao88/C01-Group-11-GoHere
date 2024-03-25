import "react-native-gesture-handler";
import React, { useCallback, useRef, useMemo, useState, useEffect} from 'react';
import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity,  TextInput, ActivityIndicator } from 'react-native';
import {   BottomSheetScrollView } from "@gorhom/bottom-sheet";


export default WashroomList = ( {navigation}) => {
     // ref
  const sheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['12%', '30%', '90%'], []);
  //callback 
  
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

    // const handleWashroomInfoPress = useCallback(() => {
    //     sheetRef.current?.expand(); // Snap to the second sheet (30%)
    //   }, []);

  
    const renderItem = useCallback((washroom) => {
      return (
        <TouchableOpacity key={washroom._id} style={styles.washroomList} 
            onPress={() => {
            navigation.navigate('WashroomInfo', { id: washroom._id });
            // handleWashroomInfoPress(); 
          }}
        >
          <Text style={styles.washroomName}>{washroom.name}</Text>
          <Text style={styles.contentText}>{washroom.fullAddress}, {washroom.province}</Text>
        </TouchableOpacity>
      );
    }, []);

    
    return(
        <View style={{height: "100%"}}>
            <View style={styles.search}>
            <TouchableOpacity >
                <TextInput
                    style={styles.input}
                    placeholder="Search for a place or address"
                    onPressIn={() => navigation.navigate('WashroomSearch')}
                />
                <Text style={styles.text}> hello </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.washroomNearby}>
                <Text style={styles.text}>WASHROOMS NEARBY</Text>
            </View>
            <BottomSheetScrollView>
                {/* <View style={styles.contentContainer}> */}
                {loading ? (
                <ActivityIndicator color={"red"} size='large'/>
                ) : (
                washrooms.map(renderItem)
                )}
            {/* </View> */}
        </BottomSheetScrollView>
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      alignContent:'center',
      alignItems:'center',
      backgroundColor: 'white',
    },
    contentContainer: {
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
    washroomName: {
        fontSize: 16,
        fontWeight:'500',
        marginBottom: 15,
      },
    text: {
      fontSize: 14,
      color:'red',
      fontWeight:'500',
      padding: 10,
      
    },
    contentText: {
        fontSize: 14,
        fontWeight:'300',
        color:'grey',
        
      },
    input: {
      height: 40,
      margin: 12,
      padding: 10,
      backgroundColor:'#efefef',
      borderRadius:5
      
    },
    washroomList: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
      padding: 10,
    },
    
  });
  
  
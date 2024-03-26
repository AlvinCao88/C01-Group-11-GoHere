import "react-native-gesture-handler";
import React, { useCallback, useRef, useMemo, useState, useEffect} from 'react';
import { StyleSheet, Text, View,  SafeAreaView, TouchableOpacity,  TextInput, ActivityIndicator, Keyboard, TouchableWithoutFeedback,  } from 'react-native';
import {   BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BackButton from '../components/BackButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchComponent from "./SearchComponent";



const WashroomSearch = ( {navigation}) => {
     // ref
  const sheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['12%', '30%', '90%'], []);
  //callback 
  
    const [text, onChangeText] = React.useState('');
    const [loading, setLoading] = useState(true);
    const [washrooms, setWashrooms] = useState([]);
    const [searchTerms, setSearchTerms] = useState([]);

    const handleTextChange = async (textValue) => {
      if (textValue.trim()) {
        try {
          const existingTerms = await AsyncStorage.getItem('searchTerms');
          const terms = existingTerms ? JSON.parse(existingTerms) : [];
          if (!terms.includes(textValue)) { 
            const updatedTerms = [textValue, ...terms];
            await AsyncStorage.setItem('searchTerms', JSON.stringify(updatedTerms));
            setSearchTerms(updatedTerms);
          }
          onChangeText('');
        } catch (e) {
          console.log(e);
        }
      }
    };
    const removeTerm = async (termToRemove) => {
      const updatedTerms = searchTerms.filter(term => term !== termToRemove);
      setSearchTerms(updatedTerms);
      await AsyncStorage.setItem('searchTerms', JSON.stringify(updatedTerms));
    };
    useEffect(() => {
      const loadSearchTerms = async () => {
        try {
          const terms = await AsyncStorage.getItem('searchTerms');
          if(terms !== null) {
            setSearchTerms(JSON.parse(terms));
          }
        } catch(e) {
          console.log(e);
        }
      };
    
      loadSearchTerms();
    }, []);
    
    


  
    // useEffect(() => {
    //   const getWashrooms = async () => {
    //     try {
    //       const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms`);
    //       if (!response.ok) {
    //         console.log("Server failed:", response.status);
    //       } else {
    //         const data = await response.json();
    //         setWashrooms(data.response);
    //       }
    //     } catch (error) {
    //       console.log("Fetch function failed:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    
    //   getWashrooms();
    // }, []);

    const handleWashroomInfoPress = useCallback(() => {
        sheetRef.current?.expand(); // Snap to the second sheet (30%)
      }, []);

  
    // const renderItem = useCallback((washroom) => {
    //   return (
    //     <TouchableOpacity key={washroom._id} style={styles.washroomList} 
    //     onPress={() => {
    //         navigation.navigate('WashroomInfo', { id: washroom._id });
    //         handleWashroomInfoPress(); 
    //       }}
    //     >
    //       <Text style={styles.washroomName}>{washroom.name}</Text>
    //       <Text style={styles.contentText}>{washroom.fullAddress}, {washroom.province}</Text>
    //     </TouchableOpacity>
    //   );
    // }, []);

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.mainContainer}>
            <SearchComponent navigation={navigation} text={text} onChangeText={onChangeText}/>
            <View style={styles.header}>
        <Text style={styles.text}>RECENT SEARCH</Text>
        {/* Back Button */}
        <BackButton text="Back" styleButton={styles.backButton} styleText={styles.backButtonText} />
      </View>
            
            <BottomSheetScrollView>
                {/* {loading ? (
                <ActivityIndicator color={"red"} size='large'/>
                ) : (
                washrooms.map(renderItem)
                )} */}
                <View style={styles.searchContainer}>
                {searchTerms.slice().map((term, index) => (
  <View key={index} style={styles.searchTermContainer}>
    <Text style={styles.searchTerm}>
      {term}
    </Text>
    <TouchableOpacity onPress={() => removeTerm(term)}>
  <Ionicons name="close-outline" size={24} color="black" />
</TouchableOpacity>
  </View>
))}
</View>

        </BottomSheetScrollView>
      </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      alignContent:'center',
      alignItems:'center',
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#D3D3D3',
      paddingBottom: 10,
      paddingTop: 10,
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
      color:'#DA5C59',
      fontWeight:'500',
      padding: 10,
      
    },
    contentText: {
        fontSize: 14,
        fontWeight:'300',
        color:'grey',
        
      },
    washroomList: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    backButton: {
      marginTop: 0,
      marginRight: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: '#ddd',
      borderRadius: 5,
      alignSelf: 'right',
    },
    backButtonText: {
      fontSize: 16,
    },
    searchTerm: {
      fontSize: 14,
      color: '#000',
    },
    searchContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    searchTermContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 25,
      marginVertical: 10,
      paddingRight: 25,
    },
  });
  
export default WashroomSearch;

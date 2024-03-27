import "react-native-gesture-handler";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import WashroomItemComponent from "./WashroomItemComponent";

const WashroomSearch = ({ route, navigation }) => {
  const { sheetRef } = route.params;
  const [text, onChangeText] = useState("");
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
    
    



  useEffect(() => {
    sheetRef.current.expand();
  }, []);

  const handleInputTextChange = (event) => {
    onChangeText(event.nativeEvent.text);
  };
  
  useEffect(() => {
    const getSearchWashrooms = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washroomSearch`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: text }), 
          }
        );
        if (!response.ok) {
          console.log("Server failed:", response.status);
          setWashrooms([]);
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
    getSearchWashrooms();
  }, [text]);

  const renderItem = useCallback((washroom) => {
    return (
      <WashroomItemComponent
        washroom={washroom}
        navigation={navigation}
        key={washroom._id}
      />
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ height: "100%", backgroundColor: "white" }}>
        <View style={styles.search}>
          <TextInput
            placeholder="Search for place or address"
            text=""
            onChange={handleInputTextChange}
            // onSubmitEditing={getSearchWashrooms}
            autoFocus={true}
            style={styles.input}
          ></TextInput>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>RECENT SEARCH</Text>
          {/* Back Button */}
        </View>

        <BottomSheetScrollView>
          {loading ? (
            <ActivityIndicator color={"red"} size="large" />
          ) : washrooms.length === 0 ? (
            <Text style={styles.noWashroomText}>No washrooms found matching the search!</Text>
          ) : (
            washrooms.map(renderItem)
          )}
        </BottomSheetScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    width: "100%",
    gap: 10,
  },
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: "#efefef",
    borderRadius: 5,
    flex: 9,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  washroomNearby: {
    // flex: 1,
    alignItems: "left",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderBottomStyle: "solid",
  },
  washroomName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: "#DA5C59",
    fontWeight: "500",
    padding: 10,
  },
  contentText: {
    fontSize: 14,
    fontWeight: "300",
    color: "grey",
  },
  noWashroomText:{
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    padding: 20,
  },
  washroomList: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  backButton: {
    marginTop: 0,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "right",
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

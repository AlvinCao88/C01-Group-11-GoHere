import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import "react-native-gesture-handler";
import SearchComponent from "./SearchComponent";
import WashroomItemComponent from "./WashroomItemComponent";

const WashroomList = ({ route, navigation }) => {

  const { location } = route.params;

  const [loading, setLoading] = useState(true);
  const [washrooms, setWashrooms] = useState([]);

  useEffect(() => {
    const getWashrooms = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms`
        );
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
      <WashroomItemComponent
        washroom={washroom}
        navigation={navigation}
        key={washroom._id}
      />
    );
  }, []);

  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in kilometers
      return distance;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.fullSize}>
        <SearchComponent
          navigation={navigation}
          text={""}
          onChangeText={() => {}}
        />
        <View style={styles.washroomNearby}>
          <Text style={styles.text}>WASHROOMS NEARBY</Text>
        </View>
        <BottomSheetScrollView style={styles.contentContainer}>
          {/* <View style={styles.contentContainer}> */}
          {loading ? (
            <ActivityIndicator color={"red"} size="large" />
          ) : (
            washrooms.sort((a, b) => {
              const distanceA = calculateDistance(location.latitude, location.longitude, a.latitude, a.longitude);
              const distanceB = calculateDistance(location.latitude, location.longitude, b.latitude, b.longitude);
              return distanceA - distanceB;
            }).map(renderItem)
          )}
          {/* </View> */}
        </BottomSheetScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fullSize: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  washroomNearby: {
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
  washroomList: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
});

export default WashroomList;

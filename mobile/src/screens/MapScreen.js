import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DirectionsPanel from "../components/DirectionsPanel";
import Map from "../components/Map";
import NavigateBottomSheets from "../components/NavigateBottomSheets";
import { useNavigationState } from "../components/NavigationStateContext";

export default function WashroomBottomSheet() {
  const sheetRef = useRef(null);
  const navigationRef = useRef(null);

  const snapPoints = useMemo(() => ["12%", "30%", "90%"], []);
  const [center, setCenter] = useState({
    latitude: 43.78309609,
    longitude: -79.1873263,
  });
  const { isWashroomInfoFocused } = useNavigationState();

  // Id is the id of the washroom so we can navigate to the correct washroom info page
  function expandAndNavigateBottomSheet(id) {
    navigationRef.current.navigate("WashroomInfo", {id: id})
    sheetRef.current.expand();
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setCenter({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Map
            center={center}
            setCenter={center}
            expandFn={expandAndNavigateBottomSheet}
          />
          {/** This is to have the map screen with the bottom sheet */}
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
          >
            <NavigateBottomSheets ref={navigationRef} sheetRef={sheetRef}/>
          </BottomSheet>
          <StatusBar style="auto" />
        </View>
        {isWashroomInfoFocused && <DirectionsPanel />}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  search: {
    height: "10%",
    alignItems: "left",
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
  text: {
    fontSize: 12,
    color: "red",
    fontWeight: "500",
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#D3D3D3",
    borderRadius: 5,
  },
  washroomList: {
    // height: 20,
    flex: 1,
    padding: 10,
    // justifyContent: 'center',
    // alignContent:'center',
    // alignItems:'center',
    backgroundColor: "white",
    padding: 10,
  },
  washroomName: {
    fontSize: 14,
    fontWeight: "600",
  },
});

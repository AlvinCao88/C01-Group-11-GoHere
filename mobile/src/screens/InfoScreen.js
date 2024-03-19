import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlidingUpPanelComponent from "../components/SlidingUpPanelComponentInfo";
import TierList from "../components/TierList";
import { useAllPrismicDocumentsByType } from "@prismicio/react";


const CARD_HEIGHT = 250;

export default function InfoScreen({ navigation }) {
  const [panelOpen, setPanelOpen] = useState(true);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: "#DA5C59" }]}>
          About GoHere
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Crohn’s and Colitis Canada’s GoHere program helps create
          understanding, supportive and accessible communities by improving
          washroom access.
        </Text>
      </View>
      <View style={styles.dividingLine}></View>
      <View style={styles.TierContainer}>
      <TierList  />
      </View>
      </ScrollView>
      <SlidingUpPanelComponent
        CARD_HEIGHT={CARD_HEIGHT}
        panelOpen={panelOpen}
        setPanelOpen={setPanelOpen}
        navigation={navigation}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  TierContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  dividingLine: {
    height: 1,
    backgroundColor: "#d7d7d7",
    width: "90%",
    marginVertical: 20,
    alignSelf: "center",
    marginBottom: 0,
  },
  panel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingTop: 10,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 28,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
});
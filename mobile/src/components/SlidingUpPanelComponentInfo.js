import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Animated } from "react-native";
import RateApp from "./RateApp";

const SlidingUpPanelComponentInfo = ({
  panelOpen,
  setPanelOpen,
  CARD_HEIGHT,
  navigation,
}) => {
  const animatedValue = useRef(new Animated.Value(CARD_HEIGHT)).current;
  useEffect(() => {
    const listenerId = animatedValue.addListener(({ value }) => {
      const isOpen = value > CARD_HEIGHT * 0.5;
      setPanelOpen(isOpen);
    });

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [animatedValue, setPanelOpen, CARD_HEIGHT]);

  return (
    <SlidingUpPanel
      draggableRange={{ top: CARD_HEIGHT, bottom: 120 }}
      animatedValue={animatedValue}
      backdropOpacity={0}
      friction={50}
    >
      <View style={styles.panel}>
        <View style={styles.panelHandle}></View>
        {panelOpen && (
          <>
            <Text style={styles.supportTitle}>Support</Text>
            <Text style={styles.supportDescription}>
              Make a donation to support the GoHere program.
            </Text>
            <View style={styles.dividingLine}></View>
          </>
        )}
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => navigation.navigate("Donate")}
        >
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
        <RateApp></RateApp>
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  dividingLine: {
    height: 1,
    backgroundColor: "#d7d7d7",
    width: "90%",
    marginVertical: 20,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginTop: 6,
  },
  donateButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 0,
    width: "90%",
    alignItems: "center",
  },
  panel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingTop: 10,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    width: "90%",
    textAlign: "left",
    marginBottom: 10,
  },
  supportDescription: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 0,
    width: "90%",
  },
  donateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default SlidingUpPanelComponentInfo;

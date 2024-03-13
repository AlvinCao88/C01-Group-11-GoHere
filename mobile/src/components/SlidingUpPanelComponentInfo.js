import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Animated } from "react-native";

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
          </>
        )}
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => navigation.navigate("Donate")}
        >
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  panel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingTop: 10,
    paddingHorizontal: 20,
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
    marginBottom: 50,
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

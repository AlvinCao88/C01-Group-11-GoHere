import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Linking } from "react-native";
import { Animated } from "react-native";

const SlidingUpPanelComponent = ({
  isEnglish,
  textTranslations,
  CARD_HEIGHT,
}) => {
  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err),
    );
  };

  return (
    <SlidingUpPanel
      draggableRange={{ top: CARD_HEIGHT, bottom: 190 }}
      animatedValue={new Animated.Value(0)}
      snappingPoints={[CARD_HEIGHT]}
      height={400}
      backdropOpacity={0}
    >
      <View style={styles.panel}>
        <View style={styles.panelHandle}></View>
        <Text style={styles.panelTitle}>
          {isEnglish
            ? textTranslations.crohnsDisease.en
            : textTranslations.crohnsDisease.fr}
        </Text>
        <Text style={styles.panelContent}>
          {isEnglish
            ? textTranslations.bottomText.en
            : textTranslations.bottomText.fr}
        </Text>
        <View style={styles.dividingLine}></View>
        <Text style={styles.spacingText}> </Text>
        <Text style={styles.spacingText}> </Text>
        <Text style={styles.spacingText}> </Text>
        <Text style={styles.spacingText}> </Text>
        <Text style={styles.spacingText}> </Text>
        <Text style={styles.spacingText}> </Text>

        <TouchableOpacity
          style={styles.buttonGrey}
          onPress={() => openURL("https://crohnsandcolitis.ca/About-Us")}
        >
          <Text style={styles.buttonTextBlack}>
            {isEnglish
              ? textTranslations.crohnsAndColitisCanada.en
              : textTranslations.crohnsAndColitisCanada.fr}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonBlack}
          onPress={() => openURL("https://crohnsandcolitis.ca/gohere")}
        >
          <Text style={styles.buttonTextWhite}>
            {isEnglish
              ? textTranslations.goHereProgram.en
              : textTranslations.goHereProgram.fr}
          </Text>
        </TouchableOpacity>
      </View>
    </SlidingUpPanel>
  );
};

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: Platform.select({ ios: 4, android: 15 }),
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "flex-start",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginTop: 6,
  },
  panelTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 15,
  },
  spacingText: {
    fontSize: 2,
    fontWeight: "bold",
  },
  panelContent: {
    fontSize: 13,
    color: "#000",
    lineHeight: 24,
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 28,
  },
  dividingLine: {
    height: 1,
    backgroundColor: "#D3D3D3",
    width: "100%",
    marginVertical: 20,
  },
  buttonGrey: {
    backgroundColor: "#EFEFEF",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
  },
  buttonBlack: {
    backgroundColor: "#000",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
    width: "95%",
    alignSelf: "center",
  },
  buttonTextBlack: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextWhite: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SlidingUpPanelComponent;

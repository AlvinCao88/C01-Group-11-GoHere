import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CardComponent from "../components/CardComponent";
import SlidingUpPanelComponent from "../components/SlidingUpPanelComponent";

const CARD_HEIGHT = 400;

export default function CardScreen() {
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  const textTranslations = {
    titleWashroom: {
      en: "Washroom",
      fr: "Toilettes",
    },
    accessCard: {
      en: "Access Card",
      fr: "Carte d'accès",
    },
    crohnsDisease: {
      en: "Crohn's Disease",
      fr: "Maladie de Crohn",
    },
    helpText: {
      en: "Please help. I require urgent access to a washroom.",
      fr: "S'il vous plaît aidez. J'ai besoin d'un accès urgent à des toilettes.",
    },
    crohnsAndColitisCanada: {
      en: "CROHN'S AND COLITIS CANADA",
      fr: "CROHN ET COLITE CANADA",
    },
    goHereProgram: {
      en: "GoHere Washroom Access Program",
      fr: "Programme d'accès aux toilettes GoHere",
    },
    bottomText: {
      en: "I live with Crohn's, a medical condition requiring urgent use of the washroom. Thank you for your understanding and cooperation.",
      fr: "Je vis avec la maladie de Crohn, une maladie qui nécessite une utilisation urgente des toilettes. Merci de votre compréhension et de votre coopération.",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: "#DA5C59" }]}>
          {isEnglish
            ? textTranslations.accessCard.en
            : textTranslations.accessCard.fr}
        </Text>
        <TouchableOpacity
          style={styles.languageToggle}
          onPress={toggleLanguage}
        >
          <View style={styles.toggleButtonContainer}>
            <View
              style={[
                styles.toggleButton,
                isEnglish ? styles.toggleButtonActive : null,
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  isEnglish ? null : styles.toggleButtonTextInactive,
                ]}
              >
                en
              </Text>
            </View>
            <View
              style={[
                styles.toggleButton,
                !isEnglish ? styles.toggleButtonActive : null,
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  !isEnglish ? null : styles.toggleButtonTextInactive,
                ]}
              >
                fr
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <CardComponent
        isEnglish={isEnglish}
        textTranslations={textTranslations}
      />

      <SlidingUpPanelComponent
        isEnglish={isEnglish}
        textTranslations={textTranslations}
        CARD_HEIGHT={CARD_HEIGHT}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  languageToggle: {
    flexDirection: "row",
    backgroundColor: "#767577",
    borderRadius: 20,
  },
  toggleButtonContainer: {
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#767577",
  },
  toggleButtonActive: {
    backgroundColor: "#d64c49",
  },
  toggleButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  toggleButtonTextInactive: {
    color: "#000000",
  },
});

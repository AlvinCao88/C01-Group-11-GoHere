import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import SlidingUpPanelComponent from "../components/SlidingUpPanelComponentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CARD_HEIGHT = 400;

export default function CardScreen() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [condition, setCondition] = useState("");

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  useEffect(() => {
    const loadNames = async () => {
      const storedFirstName = await AsyncStorage.getItem("firstName");
      const storedLastName = await AsyncStorage.getItem("lastName");
      const storedCondition = await AsyncStorage.getItem("condition");
      if (storedFirstName) {
        setFirstName(storedFirstName);
      } else {
        setFirstName("");
      }
      if (storedLastName) {
        setLastName(storedLastName);
      } else {
        setLastName("");
      }
      if (storedCondition) {
        setCondition(storedCondition);
      } else {
        setCondition("Crohn's disease");
      }
    };

    loadNames();

    return () => {};
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadNames = async () => {
        const storedFirstName = await AsyncStorage.getItem("firstName");
        const storedLastName = await AsyncStorage.getItem("lastName");
        const storedCondition = await AsyncStorage.getItem("condition");
        if (storedFirstName) {
          setFirstName(storedFirstName);
        } else {
          setFirstName("");
        }
        if (storedLastName) {
          setLastName(storedLastName);
        } else {
          setLastName("");
        }
        if (storedCondition) {
          setCondition(storedCondition);
        } else {
          setCondition("Crohn's disease");
        }
      };

      loadNames();
    }, [])
  );

  const textTranslations = {
    titleWashroom: {
      en: "Washroom",
      fr: "Toilette",
    },
    accessCard: {
      en: "Access Card",
      fr: "Carte d'accès",
    },
    crohnsDisease: {
      en: "Crohn's Disease",
      fr: "Maladie de Crohn",
    },
    ulcerativeDisease: {
      en: "Ulcerative colitis",
      fr: "Colite ulcéreuse",
    },
    helpText: {
      en: "Please help. I require urgent access to a washroom.",
      fr: "Veuillez m'aider. Je nécessite un accés urgent aux toilettes.",
    },
    crohnsAndColitisCanada: {
      en: "CROHN'S AND COLITIS CANADA",
      fr: "CROHN ET COLITE CANADA",
    },
    goHereProgram: {
      en: "GoHere Washroom Access Program",
      fr: "Programme accès aux toilettes GoHere",
    },
    bottomTextChohns: {
      en: "I live with Crohn's, a medical condition requiring urgent use of the washroom. Thank you for your understanding and cooperation.",
      fr: "J'ai la maladie de Crohn, une maladie qui nécessite un accès urgent aux toilettes. Merci de votre compréhension et de votre coopération.",
    },
    bottomTextColitis: {
      en: "I live with colitis, a medical condition requiring urgent use of the washroom. Thank you for your understanding and cooperation.",
      fr: "Je vis avec la maladie colite ulcéreuse. Mon état fait en sorte que je dois utiliser vos toilettes d'urgence. Merci de votre compréhension et de votre soutien.",
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
          <View style={styles.switchContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleLanguage}
              style={[styles.switchButton, isEnglish && styles.activeButton]}
            >
              <Text style={[styles.switchText, isEnglish && styles.activeText]}>
                en
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleLanguage}
              style={[styles.switchButton, !isEnglish && styles.activeButton]}
            >
              <Text
                style={[styles.switchText, !isEnglish && styles.activeText]}
              >
                fr
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.shadowContainer}>
        <View style={styles.cardMaster}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/IMG_2348.jpg")}
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitleWashroom}>
                {isEnglish
                  ? textTranslations.titleWashroom.en
                  : textTranslations.titleWashroom.fr}
              </Text>
              <Text style={styles.cardTitle}>
                {isEnglish
                  ? textTranslations.accessCard.en
                  : textTranslations.accessCard.fr}
              </Text>
              <View style={styles.subtitleBox}>
                <Text style={styles.cardSubtitle}>
                  {isEnglish && condition == "Ulcerative colitis"
                    ? textTranslations.ulcerativeDisease.en
                    : !isEnglish && condition == "Ulcerative colitis"
                    ? textTranslations.ulcerativeDisease.fr
                    : !isEnglish && condition == "Crohn's disease"
                    ? textTranslations.crohnsDisease.fr
                    : textTranslations.crohnsDisease.en}
                </Text>
              </View>

              {firstName || lastName ? (
                <Text style={styles.cardName}>
                  {`${firstName} ${lastName}`.trim()}
                </Text>
              ) : (
                <Text style={styles.invisibleText}>Place Holder</Text>
              )}

              <Text style={styles.cardContent}>
                {isEnglish
                  ? textTranslations.helpText.en
                  : textTranslations.helpText.fr}
              </Text>
            </View>
          </View>
        </View>
      </View>

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
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#CCCCCC",
    borderRadius: 6,
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 10,
  },
  switchButton: {
    width: 42,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  activeButton: {
    backgroundColor: "#d64c49",
    borderRadius: 6,
  },
  switchText: {
    fontWeight: "normal",
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  activeText: {
    color: "#fff",
  },
  //styles for card below
  shadowContainer: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: Platform.select({ ios: 0.35, android: 0 }),
    shadowRadius: Platform.select({ ios: 10, android: 0 }),
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
  },
  cardMaster: {
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    elevation: Platform.select({ ios: 0, android: 15 }),
    borderRadius: 10,
    width: "95%",
    alignSelf: "center",
  },
  logo: {
    width: 120,
    height: 190,
    resizeMode: "contain",
  },
  cardTextContainer: {
    flex: 1,
    backgroundColor: "#d64c49",
    padding: 20,
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardTitleWashroom: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  subtitleBox: {
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginVertical: 4,
    backgroundColor: "transparent",
    marginTop: 15,
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  cardContent: {
    color: "#fff",
    fontSize: 14,
    textAlign: "left",
    marginTop: 5,
  },
  cardName: {
    color: "#fff",
    fontSize: 16,
    textAlign: "left",
    marginTop: 20,
    fontWeight: "bold",
  },
  invisibleText: {
    color: "transparent",
    fontSize: 16,
    textAlign: "left",
    marginTop: 20,
    fontWeight: "bold",
  },
});

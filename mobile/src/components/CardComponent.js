// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet, Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const CardComponent = ({ isEnglish, textTranslations }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [condition, setCondition] = useState('');

//   useEffect(() => {
//     const loadNames = async () => {
//       const storedFirstName = await AsyncStorage.getItem('firstName');
//       const storedLastName = await AsyncStorage.getItem('lastName');
//       const storedCondition = await AsyncStorage.getItem('condition');
//       if (storedFirstName) setFirstName(storedFirstName);
//       if (storedLastName) setLastName(storedLastName);
//       if (storedCondition) {
//         setCondition(storedCondition);
//       } else {
//         setCondition("Crohn's disease");
//       }
//     };

//     loadNames();
//   }, []);

//   return (
//     <View style={styles.shadowContainer}>
//       <View style={styles.cardMaster}>
//         <View style={styles.cardContainer}>
//           <Image
//             style={styles.logo}
//             source={require("../../assets/IMG_2348.jpg")}
//           />
//           <View style={styles.cardTextContainer}>
//             <Text style={styles.cardTitleWashroom}>
//               {isEnglish
//                 ? textTranslations.titleWashroom.en
//                 : textTranslations.titleWashroom.fr}
//             </Text>
//             <Text style={styles.cardTitle}>
//               {isEnglish
//                 ? textTranslations.accessCard.en
//                 : textTranslations.accessCard.fr}
//             </Text>
//             <View style={styles.subtitleBox}>
//               <Text style={styles.cardSubtitle}>
//               {isEnglish && condition == "Ulcerative colitis"
//                 ? textTranslations.ulcerativeDisease.en
//                 : !isEnglish && condition == "Ulcerative colitis"
//                 ? textTranslations.ulcerativeDisease.fr
//                 : !isEnglish && condition == "Crohn's disease"
//                 ? textTranslations.crohnsDisease.fr
//                 : textTranslations.crohnsDisease.en }
//               </Text>
//             </View>

//             {(firstName || lastName) ? (
//   <Text style={styles.cardName}>
//     {`${firstName} ${lastName}`.trim()}
//   </Text>
// ) : (
//   <Text style={styles.invisibleText}>Place Holder</Text>
// )}

//             <Text style={styles.cardContent}>
//               {isEnglish
//                 ? textTranslations.helpText.en
//                 : textTranslations.helpText.fr}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   shadowContainer: {
//     alignItems: "center",
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: Platform.select({ ios: 0.35, android: 0 }),
//     shadowRadius: Platform.select({ ios: 10, android: 0 }),
//     width: "95%",
//     alignSelf: "center",
//     borderRadius: 5,
//   },
//   cardMaster: {
//     alignItems: "center",
//     width: "100%",
//     alignSelf: "center",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   spacingText: {
//     fontSize: 2,
//     fontWeight: "bold",
//   },
//   cardContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 20,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 0 },
//     elevation: Platform.select({ ios: 0, android: 15 }),
//     borderRadius: 10,
//     width: "95%",
//     alignSelf: "center",
//   },
//   logo: {
//     width: 120,
//     height: 190,
//     resizeMode: "contain",
//   },
//   cardTextContainer: {
//     flex: 1,
//     backgroundColor: "#d64c49",
//     padding: 20,
//     justifyContent: "center",
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   cardTitle: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   cardTitleWashroom: {
//     color: "#fff",
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   subtitleBox: {
//     borderColor: "white",
//     borderWidth: 1,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 6,
//     alignSelf: "flex-start",
//     marginVertical: 4,
//     backgroundColor: "transparent",
//     marginTop: 15,
//   },
//   cardSubtitle: {
//     color: "#fff",
//     fontSize: 18,
//     textAlign: "center",
//   },
//   cardContent: {
//     color: "#fff",
//     fontSize: 14,
//     textAlign: "left",
//     marginTop: 5,
//   },
//   cardName: {
//     color: "#fff",
//     fontSize: 16,
//     textAlign: "left",
//     marginTop: 20,
//     fontWeight: "bold",
//   },
//   invisibleText: {
//     color: "transparent",
//     fontSize: 16,
//     textAlign: "left",
//     marginTop: 20,
//     fontWeight: "bold",
//   },
// });

// export default CardComponent;

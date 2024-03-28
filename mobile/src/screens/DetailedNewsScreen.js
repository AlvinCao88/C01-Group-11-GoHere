import { RichText } from "react-native-prismic-richtext";
import { usePrismicDocumentByID } from "@prismicio/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";

const DetailedNewsScreen = ({ route }) => {
  const { id } = route.params;
  const [document] = usePrismicDocumentByID(id);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {document && (
        <ScrollView style={styles.container}>
          <View style={styles.title}>
            <BackButton
              text="Back"
              styleButton={styles.editButton}
              styleText={styles.buttonText}
            />
            <RichText
              richText={document.data.title}
              defaultStyle={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#DA5C59",
              }}
            />
          </View>
          <Text style={styles.date}>
            Date Published: {document.data.publication_data}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: document.data.image.url }}
              style={styles.image}
            />
          </View>
          <RichText
            richText={document.data.body}
            styles={{
              hyperlink: { textDecorationLine: "underline" },
              hyperlinkHover: {
                textDecorationLine: undefined,
              },
            }}
          />
          <View style={styles.bottomPadding}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 300,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  date: {
    marginVertical: 15,
  },
  bottomPadding: {
    height: 100,
  },
  editButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  title: {
    display: "flex",
    alignItems: "flex-start",
    gap: 20,
  },
});

export default DetailedNewsScreen;

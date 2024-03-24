import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import { RichText } from "react-native-prismic-richtext";
import { View } from "react-native";

const NewsScreen = ({ navigation }) => {
  const [results] = useAllPrismicDocumentsByType("news_and_articles");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.header}>News and Updates</Text>
      <ScrollView style={styles.container}>
        {results &&
          results.length !== 0 &&
          results.map((e) => (
            <TouchableOpacity
              key={e.id}
              style={styles.newsItem}
              onPress={() => navigation.navigate("Detailed News", { id: e.id })}
            >
              <RichText richText={e.data.title} defaultStyle={styles.newsTitle} />
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: e.data.image.url }}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: "#DA5C59",
  },
  newsItem: {
    marginVertical: 20
  },
  imageContainer: {
    height: 200,
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover", 
  },
  newsTitle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#DA5C59",
    padding: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    borderTopEndRadius: 200
  },
});

export default NewsScreen;

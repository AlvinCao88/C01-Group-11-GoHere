import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import WashroomItemComponent from "../components/WashroomItemComponent";
import SearchComponent from "../components/SearchComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BackButton from "../components/BackButton";

const WashroomBookmarksList = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getBookmarks = async () => {
      setLoading(true);
      try {
        const fetched = JSON.parse(await AsyncStorage.getItem("bookmarks"));
        console.log(fetched);
        if (fetched) {
          setBookmarks(fetched);
        }
      } catch (e) {
        console.log(e);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

    getBookmarks();
  }, []);

  const handleUnsaveWashroom = async (id) => {
    try {
      // remove washroom from bookmarks
      await AsyncStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks.filter((e) => e._id !== id))
      );
      setBookmarks(bookmarks.filter((e) => e._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.fullSize}>
        <View style={styles.title}>
          <Text style={styles.text}>SAVED WASHROOMS</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.editButton}
              onPressIn={() => setEditMode(!editMode)}
            >
              <Text style={styles.buttonText}>
                {editMode ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
            <BackButton
              text="Back"
              styleButton={styles.editButton}
              styleText={styles.buttonText}
            />
          </View>
        </View>

        <BottomSheetScrollView style={styles.test}>
          {loading ? (
            <ActivityIndicator color={"red"} size="large" />
          ) : (
            bookmarks &&
            bookmarks.map((e) =>
              editMode ? (
                <View key={e._id} style={styles.editContainer}>
                  <WashroomItemComponent washroom={e} navigation={navigation} />
                  <TouchableOpacity
                    onPress={() => {
                      handleUnsaveWashroom(e._id);
                    }}
                  >
                    <MaterialIcons
                      style={styles.delete}
                      name="remove-circle"
                      size={24}
                      color={"red"}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <WashroomItemComponent
                  washroom={e}
                  navigation={navigation}
                  key={e._id}
                />
              )
            )
          )}
        </BottomSheetScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fullSize: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    fontSize: 14,
    color: "#DA5C59",
    fontWeight: "500",
    padding: 5,
  },
  edit: {
    padding: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  delete: {
    padding: 10,
  },
  backButton: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "right",
    alignItems: "center",
    width: "18%",
  },
  backButtonText: {
    fontSize: 16,
  },
  editButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});

export default WashroomBookmarksList;

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
        JSON.stringify(bookmarks.filter((e) => e._id !== id)),
      );
      setBookmarks(bookmarks.filter((e) => e._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.fullSize}>
        <SearchComponent
          navigation={navigation}
          text={""}
          onChangeText={() => {}}
        />
        <View style={styles.title}>
          <Text style={styles.text}>SAVED WASHROOMS</Text>
          <TouchableOpacity
            style={styles.edit}
            onPressIn={() => setEditMode(!editMode)}
          >
            {editMode ? <Text>Done</Text> : <Text>Edit</Text>}
          </TouchableOpacity>
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
              ),
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
  },
  title: {
    alignItems: "left",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderBottomStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    color: "red",
    fontWeight: "500",
    padding: 10,
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
});

export default WashroomBookmarksList;

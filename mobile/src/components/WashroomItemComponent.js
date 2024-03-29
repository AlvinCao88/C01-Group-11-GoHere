import { StyleSheet, Text, TouchableOpacity } from "react-native";
const WashroomItemComponent = ({ washroom, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.washroomList}
      onPress={() => {
        navigation.navigate("WashroomInfo", { id: washroom._id });
      }}
    >
      <Text style={styles.washroomName}>{washroom.name}</Text>
      <Text style={styles.contentText}>
        {washroom.fullAddress}, {washroom.province}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  washroomName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: "red",
    fontWeight: "500",
    padding: 10,
  },
  contentText: {
    fontSize: 14,
    fontWeight: "300",
    color: "grey",
  },
  washroomList: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
});
export default WashroomItemComponent;

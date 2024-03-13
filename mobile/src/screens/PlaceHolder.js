import { View, Text, StyleSheet} from "react-native";
import TestComponent from "../components/TestComponent";
import WashroomBottomSheet from "../components/WashroomBottomSheet";
import "react-native-gesture-handler";

export default function PlaceHolder() {
  return (
    <View style={styles.container}>
      <Text> Hello there</Text>
      {/* <TestComponent /> */}
      <WashroomBottomSheet/>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
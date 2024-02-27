import { View } from "react-native";

import TestComponent from "../components/TestComponent";

export default function TestScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TestComponent />
    </View>
  );
}

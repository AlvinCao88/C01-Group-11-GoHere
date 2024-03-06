import { View } from "react-native";

import TestComponent from "../components/TestComponent";

import Map from "../components/Map";
import CurrentLocation from './../components/CurrentLocation';

export default function TestScreen() {
  return (
    <View>
      <TestComponent />
      <CurrentLocation/>
      <Map />
    </View>
  );
}

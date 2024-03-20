import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import Map from "../components/Map";


export default function MapScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Map />
    </View>
  );
}

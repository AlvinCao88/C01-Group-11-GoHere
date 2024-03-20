import React from "react";
import { View, Button, Platform, StyleSheet, TouchableOpacity, Text  } from "react-native";
import { Linking } from "react-native";

export default function RateApp () {
    const gotoAppStore = () => {
        if (Platform.OS === "ios") {
            Linking.openURL("https://apps.apple.com/ca/app/gohere-washroom-locator/id1011069090");
        }
        else if (Platform.OS === "android") {
            Linking.openURL("https://play.google.com/store/apps/details?id=com.GoHere.GoHere");
        }
    };

    return (
        <View>
            
            <TouchableOpacity
                style={styles.rateButton}
                onPress={gotoAppStore}
            >
                <Text style={styles.rateButtonText}>Rate Us</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    rateButton: {
        backgroundColor: "#d64c49",
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderRadius: 8,
        marginTop: 10,
        width: "100%",
        alignItems: "center"
    },
    rateButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
      }
})
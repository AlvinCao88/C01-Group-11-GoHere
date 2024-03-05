import React from "react";
import { View, Button, Platform  } from "react-native";
import { Linking } from "react-native";

const RateApp = () => {
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
            <Button
                title='Rate us'
                color='#e84338'
                onPress={gotoAppStore}
            />
        </View>
    );
};

export default RateApp;
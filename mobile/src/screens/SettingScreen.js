import React, { useState } from 'react';
import { Linking, TouchableOpacity, SafeAreaView,
        View, Text, StyleSheet, Switch, Button } from 'react-native';
import { IoChevronForwardOutline } from "react-icons/io5";;

//TODO: add in navigation to other screens
//TODO: test
export default function SettingScreen (navigation) {
    const [analytics, setAnalytics] = useState(false); // the state used to keep track of analytics on or off

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText, { color: "#DA5C59" }]}>
                    Settings
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.3}
                onPress={() => navigation.navigate("Profile")}
            >
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>
                        My profile
                    </Text>
                    <IoChevronForwardOutline></IoChevronForwardOutline>
                </View>
            </TouchableOpacity>

            <Text style={styles.headerText}>
                APP SETTINGS
            </Text>
            <View style={styles.dividingLine}></View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.3}
                onPress={() => Linking.openSettings()}
            >
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>
                        Location Permission
                    </Text>
                    <IoChevronForwardOutline></IoChevronForwardOutline>
                </View>
            </TouchableOpacity>

            <View  style={styles.arrow}>
                <Text style={styles.buttonText}>Analytics</Text>
                <Switch
                    onChange={() => analytics ? setAnalytics(false) : setAnalytics(true)}
                    trackColor={{false: "#767577", true: "#DA5C59"}}
                ></Switch>
            </View>
            <Text style={styles.smallText}>
                Enable analytics to send anonymous usage to support app improvements.
            </Text>

            <Text style={styles.headerText}>
                PRIVACY AND TERMS
            </Text>
            <View style={styles.dividingLine}></View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.3}
            >
                <View>
                    <Text style={styles.buttonText}>
                        Privacy Policy
                    </Text>
                    <IoChevronForwardOutline style={styles.arrow}></IoChevronForwardOutline>
                </View>
            </TouchableOpacity>

            <Text style={styles.headerText}>
                SUPPORT
            </Text>
            <View style={styles.dividingLine}></View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.3}
            >
                <View>
                    <Text style={styles.buttonText}>
                        Request Support
                    </Text>
                    <IoChevronForwardOutline style={styles.arrow}></IoChevronForwardOutline>
                </View>
            </TouchableOpacity>

            <View>
                <Text style={styles.buttonText}>
                    Version
                </Text>
                <Text style={styles.versionText}>
                    1.0.0
                </Text>
            </View>
    
            <TouchableOpacity
                style={styles.addWashroomButton}
                onPress={() => navigation.navigate()}
            >
                Add a washroom
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
    },

    dividingLine: {
        height: 1,
        backgroundColor: "#d7d7d7",
        width: "90%",
        marginVertical: 20,
        alignSelf: "center",
        marginBottom: 40,
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },

    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#DA5C59"
    },

    button: {
        backgroundColor: "transparent",
        width: "90%",
        alignSelf: "center",
        marginBottom: 15
    },

    buttonText: {
        fontSize: 10,
        textAlign: "left",
        color: "black",
        flexDirection: "row",
        justifyContent: "flex-start"
    },

    arrow: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },

    smallText: {
        fontSize: 5,
        textAlign: "center",
        color: "black",
        flexDirection: "row",
        justifyContent: "flex-start"
    },

    versionText: {
        fontSize: 5,
        color: "black",
        flexDirection: "row",
        justifyContent: "flex-end"
    },

    addWashroomButton: {
        backgroundColor: "#e84338",
        paddingVertical: 15,
        paddingHorizontal: 130,
        borderRadius: 8,
        marginTop: 10,
        width: "100%",
        alignItems: "center"
    },
})
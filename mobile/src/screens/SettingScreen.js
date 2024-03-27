import React, { useState } from 'react';
import { Linking, TouchableOpacity, SafeAreaView,
        View, Text, StyleSheet, Switch } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function SettingScreen ({navigation}) {
    const [analytics, setAnalytics] = useState(false); // the state used to keep track of analytics on or off

    //email for support with prefilled information
    const supportEmailAddress = "gohere@crohnsandcolitis.ca";
    const supportEmailSubject = "support%20request";

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[styles.titleText, { color: "#DA5C59" }]}>
                    Settings
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.3}
            >
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>
                            My profile
                    </Text>
                    <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
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
                    <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} activeOpacity={1}>
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>Analytics</Text>
                    <Switch
                        value={analytics}
                        onValueChange={() => setAnalytics(!analytics)}
                        trackColor={{false: "#767577", true: "#DA5C59"}}
                        thumbColor={analytics ? "#3BBEFF" : "#BEBEBE"}
                    ></Switch>
                </View>
                <Text style={styles.smallText}>
                    Enable analytics to send anonymous usage to support app improvements.
                </Text>
            </TouchableOpacity>

            <Text style={styles.headerText}>
                PRIVACY AND TERMS
            </Text>
            <View style={styles.dividingLine}></View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.3}
                onPress={() => Linking.openURL("https://crohnsandcolitis.ca/Privacy-Policy")}
            >
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>
                        Privacy Policy
                    </Text>
                    <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
                </View>
            </TouchableOpacity>

            <Text style={styles.headerText}>
                SUPPORT
            </Text>
            <View style={styles.dividingLine}></View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.3}
                onPress={() => Linking.openURL(`mailto:${supportEmailAddress}?subject=${supportEmailSubject}`)}
            >
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>
                        Request Support
                    </Text>
                    <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} activeOpacity={1}>
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>
                        Version
                    </Text>
                    <Text style={styles.versionText}>
                        1.0.0
                    </Text>
                </View>
            </TouchableOpacity>
    
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("AddWashrooms")}
            >
                <View style={styles.arrow}>
                    <Text style={styles.buttonText}>
                        Add a washroom
                    </Text>
                    <Ionicons name="chevron-forward-outline" size={16}></Ionicons>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 20,
    },

    dividingLine: {
        height: 1,
        backgroundColor: "#d7d7d7",
        width: "90%",
        marginVertical: 20,
        alignSelf: "center",
        marginBottom: 12,
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },

    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#DA5C59"
    },

    button: {
        backgroundColor: "transparent",
        width: "90%",
        alignSelf: "center",
        marginTop: 12,
        marginBottom: 12
    },

    buttonText: {
        fontSize: 15,
        textAlign: "left",
        color: "black",
    },

    arrow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    smallText: {
        fontSize: 10,
        textAlign: "left",
        color: "black",
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    versionText: {
        fontSize: 10,
        color: "black",
    },

    addWashroomButton: {
        backgroundColor: "#e84338",
        paddingVertical: 15,
        paddingHorizontal: 130,
        borderRadius: 8,
        marginTop: 10,
        width: "90%",
        justifyContent: "space-between"
    },

    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        color: "#DA5C59",
        paddingHorizontal: 20
    }
})
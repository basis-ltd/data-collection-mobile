import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../utils/colors";

const AppLoadingSpin = ({ size = 'large', color = colors.PRIMARY }) => {

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});

export default AppLoadingSpin;

import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import LottieView from "lottie-react-native";
import { lotties } from "../utils/assets";

const AppLoadingSpin = () => {
    const animation = useRef(null);

    useEffect(() => {
        animation.current?.reset();
        animation.current?.play();
    }, []);

    return (
        <View style={styles.loadingContainer}>
            <LottieView
                autoPlay
                ref={animation}
                loop
                style={styles.blurContainer}
                source={lotties.LoadingPages}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        backgroundColor: colors.LIGHT_Opaque,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        zIndex: 9999,
    },
    blurContainer: {
        width: 150,
        aspectRatio: 1 / 1,
        height: "auto",
    },


});

export default AppLoadingSpin;

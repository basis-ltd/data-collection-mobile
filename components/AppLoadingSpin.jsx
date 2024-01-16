import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { colors } from "../utils/colors";
import LottieView from "lottie-react-native";
import { lotties } from "../utils/assets";
import { BlurView } from 'expo-blur';

const AppLoadingSpin = (props) => {
    const { loading } = props;
    const animation = useRef(null);

    useEffect(() => {
        if (loading) {
            animation.current?.reset();
            animation.current?.play();
        }
    }, [loading]);

    return (
        <BlurView intensity={80} tint="light" style={styles.loadingContainer}>
            <LottieView
                autoPlay
                ref={animation}
                loop
                style={styles.lottieViewAnim}
                source={lotties.Loading}
            />
        </BlurView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.LIGHT_Opaque,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        zIndex: 9999,
        display: "flex",
    },
    lottieViewAnim: {
        width: 50,
        aspectRatio: 1 / 1,
        height: "auto",
        borderRadius: "50%"
    },


});

export default AppLoadingSpin;

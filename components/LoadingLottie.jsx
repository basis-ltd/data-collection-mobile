import React, { useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import LottieView from "lottie-react-native";
import { lotties } from "../utils/assets";
import { BlurView } from 'expo-blur';

const LoadingLottie = (props) => {
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
        source={lotties.LoadingPages}
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
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
    opacity: 0.6,
  },
  lottieViewAnim: {
    width: 100,
    aspectRatio: 1 / 1,
    height: "auto",
    borderRadius: 50
  },
});

export default LoadingLottie;

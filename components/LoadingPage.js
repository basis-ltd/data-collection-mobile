import React, { useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../utils/colors";
import LottieView from "lottie-react-native";
import { assets, lotties } from "../utils/assets";

const LoadingPage = (props) => {
  const { loading } = props;
  const animation = useRef(null);

  useEffect(() => {
    if (loading) {
      animation.current?.reset();
      animation.current?.play();
    }
  }, [loading]);

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.topHomePage}>
        <Image source={assets.RSALogoWhite} style={styles.logoAppWhite} />
        <LottieView
          autoPlay
          ref={animation}
          loop
          style={styles.lottieViewAnim}
          source={lotties.LoadingPages}
        />
      </View>
      <View style={styles.bottonHomePage}>
        <Text style={styles.bottomHomeText}>Gather Data. Drive Impact.</Text>
      </View>
    </View>
  );
};

// protypes---
LoadingPage.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  topHomePage: {
    flex: 1,
    display: "flex",
    padding: 0,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoAppWhite: {
    width: 161,
    height: 74,
    position: "relative",
    zIndex: 1,
  },
  lottieViewAnim: {
    width: "100%",
    aspectRatio: 1 / 1,
    height: "auto",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 0,
    opacity: 0.5,
  },
  bottonHomePage: {
    backgroundColor: colors.TRANSPARENT,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomHomeText: {
    fontSize: 16,
    color: colors.LIGHT,
    paddingVertical: 15,
  },
});

export default LoadingPage;

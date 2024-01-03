import React from "react";
import { StyleSheet, SafeAreaView, Image, View, Text } from "react-native";
import AppButton from "../components/AppButton";
import { assets } from "../utils/assets";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { router } from "expo-router";
import { frontendAPI } from "../api/frontendApi";

const GettingStarted = () => {
  const handleLoginSubmit = () => {
    router.push(frontendAPI.Login);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={assets.GetStartedPageImage}
        style={styles.loginImage}
        alt="Get started SVG"
      />
      <View style={styles.titleBox}>
        <Text style={styles.title}>Welcome to Data Collection App!</Text>
        <Text style={styles.subTitle}>Let's Begin Collecting Insights. </Text>
      </View>
      <AppButton
        fullWidth={true}
        title="Get STarted"
        handleOnPress={handleLoginSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.LIGHT,
    padding: 24,
    gap: 18,
    alignItems: "center",
  },
  loginImage: {
    width: "78.16030534351145%",
    aspectRatio: 307.17 / 393,
    height: "auto",
    marginTop: 100,
  },
  titleBox: {
    display: "flex",
    width: "100%",
    gap: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 20,
    color: colors.PRIMARY,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
  },
  subTitle: {
    fontSize: 17,
    color: colors.PRIMARY,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
  },
});

export default GettingStarted;

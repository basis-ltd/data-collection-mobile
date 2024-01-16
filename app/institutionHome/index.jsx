import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";


const Home = () => {

  return (
    <PageGuard style={styles.containerHome}>
      <Text>Projects home</Text>
    </PageGuard>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.LIGHT,
    padding: 24,
    gap: 10,
    alignItems: "center",
  },
});

export default Home;

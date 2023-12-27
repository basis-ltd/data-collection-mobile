import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LoadingPage from "../components/LoadingPage";
import { colors } from "../utils/colors";
import GettingStarted from "../ui/GettingStarted";
import { loadAppFonts } from "../utils/fonts";

const Home = () => {
  const [loadFontsFamily, setLoadFontsFamily] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await loadAppFonts();
    }
    loadFonts();

    const timer = setTimeout(() => {
      setLoadFontsFamily(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.appContainer}>
      {/* show loading --- */}
      {loadFontsFamily && <LoadingPage loading={loadFontsFamily} />}
      {!loadFontsFamily && <GettingStarted />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
});

export default Home;

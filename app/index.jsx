import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LoadingPage from "../components/LoadingPage";
import { colors } from "../utils/colors";
import GettingStarted from "../ui/GettingStarted";
import { loadAppFonts } from "../utils/fonts";
import useIsUSerLoggedIn from "../hooks/useIsUSerLoggedIn";
import { setLoggedIn } from "./login/phoneNumber.slice";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { frontendAPI } from "../api/frontendApi";

const App = () => {
  const [loadFontsFamily, setLoadFontsFamily] = useState(true);
  const { token } = useIsUSerLoggedIn();
  const dispatch = useDispatch();


  useEffect(() => {
    async function loadFonts() {
      await loadAppFonts();
    }
    loadFonts();

    const timer = setTimeout(() => {
      setLoadFontsFamily(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loadFontsFamily && token) {
      dispatch(setLoggedIn(true));
      router.push(frontendAPI.InstitutionHome);
    }
  }, [loadFontsFamily]);

  return (
    <SafeAreaView style={styles.appContainer}>
      {loadFontsFamily && <LoadingPage loading={loadFontsFamily} />}
      {!loadFontsFamily && !token && <GettingStarted />}
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

export default App;

import React, { useEffect, useState, useRef } from "react";
import { Provider } from "react-redux";
import { StyleSheet, SafeAreaView } from "react-native";
import LoadingPage from "../components/LoadingPage";
import { colors } from "../utils/colors";
import GettingStarted from "../ui/GettingStarted";
import { loadAppFonts } from "../utils/fonts";
// import store from "../store/store";
import { makeStore } from "../store/store";

const App = () => {
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

  const storeRef = useRef()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <SafeAreaView style={styles.appContainer}>
        {loadFontsFamily && <LoadingPage loading={loadFontsFamily} />}
        {!loadFontsFamily && <GettingStarted />}
      </SafeAreaView>
    </Provider>
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

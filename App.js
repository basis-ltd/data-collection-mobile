import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./src/screens/Login";
import { colors } from "./src/utils/colors";
import { fonts } from "./src/utils/fonts";
import { loadAppFonts } from "./src/utils/fonts";
import LoadingPage from "./src/components/LoadingPage";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await loadAppFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // show loading ---
  if (fontsLoaded === false) return <LoadingPage />;

  return (
    <View
      className="flex-1 items-center justify-center h-screen"
      style={styles.appContainer}
    >
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    padding: 0,
    fontFamily: fonts.MONTSERRAT_BLACK,
  },
});

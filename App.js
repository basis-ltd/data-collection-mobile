import React, { useEffect, useState } from "react";
import { loadAppFonts } from "./src/utils/fonts";
import LoadingPage from "./components/LoadingPage";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "./utils/colors";

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
  if (fontsLoaded === false) return <LoadingPage loading={fontsLoaded} />;

  return (
    <View style={styles.container}>
      <Text>Home page</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
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

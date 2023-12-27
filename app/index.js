import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import LoadingPage from "../components/LoadingPage";
import { colors } from "../utils/colors";

const Home = () => {
  const [showLoadingPage, setShowLoadingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingPage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.appContainer}>
      {showLoadingPage && <LoadingPage loading={showLoadingPage} />}
      {!showLoadingPage && <Text>Home</Text>}
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

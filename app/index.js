import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { apiRoutes } from "../api/frontendApi";
import LoadingPage from "../components/LoadingPage";

const Home = () => {
  const [showLoadingPage, setShowLoadingPage] = useState(true);

  // const goToLogin = () => {
  //   navigation.navigate(apiRoutes.Login);
  // };

  useEffect(() => {
    setTimeout(() => {
      setShowLoadingPage(false);
    }, 1000);
  }, []);

  return (
    <View>
      {showLoadingPage && <LoadingPage loading={showLoadingPage} />}
      {!showLoadingPage && <Text>Home</Text>}
    </View>
  );
};

export default Home;

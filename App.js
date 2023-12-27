import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { loadAppFonts } from "./src/utils/fonts";
import LoadingPage from "./src/components/LoadingPage";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import { apiRoutes } from "./src/api/frontendApi";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const Stack = createNativeStackNavigator();

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
    <NavigationContainer initialRouteName={apiRoutes.Home}>
      <Stack.Navigator>
        <Stack.Screen name={apiRoutes.Home} component={Home} />
        <Stack.Screen name={apiRoutes.Login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { Stack } from "expo-router";
import { colors } from "../utils/colors";
import { useState, useEffect } from "react";
import CustomBackButton from "../components/CustomBackButton";
import StoreProvider from "./StoreProvider";
// import { Platform } from "react-native";

const AppLayout = () => {
  const [waitForHomeToLoad, setWaitForHomeToLoad] = useState(true);

  const headerTitleStyle = {
    color: colors.PRIMARY,
    textAlign: "center",
  };

  const generalStyles = {
    headerStyle: {
      backgroundColor: colors.LIGHT,
      elevation: 0,
      borderBottomWidth: 0,
      shadowColor: colors.TRANSPARENT,
    },
    headerShadowVisible: false,
    headerTitleAlign: "center",
    headerTitleStyle,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitForHomeToLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...generalStyles,
            headerShown: false,
            headerStyle: {
              backgroundColor: waitForHomeToLoad ? colors.PRIMARY : colors.LIGHT,
            },
            headerTitleStyle: {
              color: waitForHomeToLoad ? colors.LIGHT : colors.PRIMARY,
            },
          }}
        />
        {/* login */}
        <Stack.Screen
          name="login/index"
          options={{
            headerTitle: "",
            ...generalStyles,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verifyOTP/index"
          options={{
            headerTitle: "",
            ...generalStyles,
            headerLeft: (props) => <CustomBackButton {...props} />,
          }}
        />
        {/*  projects home */}
        <Stack.Screen
          name="institutionHome/index"
          options={{
            headerTitle: "",
            ...generalStyles,
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.LIGHT,
            },
          }}
        />
      </Stack>
    </StoreProvider>
  );
};

export default AppLayout;

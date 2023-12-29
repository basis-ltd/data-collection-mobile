import { Stack } from "expo-router";
import { colors } from "../utils/colors";
import { assets } from "../utils/assets";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const [waitForHomeToLoad, setWaitForHomeToLoad] = useState(true);

  const headerTitleStyle = {
    color: colors.PRIMARY,
    textAlign: "center",
  };

  const generalStyles = {
    headerStyle: { backgroundColor: colors.LIGHT },
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

      <Stack.Screen
        name="login/index"
        options={{
          headerTitle: "",
          ...generalStyles,
          headerShown: false,
          headerLeft: (props) => <CustomBackButton {...props} />,
        }}
      />
    </Stack>
  );
};

const CustomBackButton = (props) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack} {...props}>
      <Image source={assets.ArrowBack} style={{ width: 43, height: 43 }} />
    </TouchableOpacity>
  );
};

export default AppLayout;

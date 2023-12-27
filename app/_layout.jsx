import { Stack } from "expo-router";
import { colors } from "../utils/colors";
import { assets } from "../utils/assets";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";

const AppLayout = () => {
  const headerTitleStyle = {
    color: colors.PRIMARY,
    textAlign: "center",
  };

  const generalStyles = {
    headerStyle: { backgroundColor: colors.LIGHT },
    headerTitleAlign: "center",
    headerTitleStyle,
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          ...generalStyles,
        }}
      />
      <Stack.Screen
        name="login/index"
        options={{
          headerTitle: "Login",
          ...generalStyles,
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

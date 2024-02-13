import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { assets } from "../utils/assets";

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

export default CustomBackButton;

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, StyleSheet } from "react-native";
import { assets } from "../utils/assets";

const CustomBackButton = (props) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack} {...props} style={styles.btn} >
      <Image source={assets.ArrowBack} style={{ width: 43, height: 43 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginLeft: 15,
  },
})

export default CustomBackButton;

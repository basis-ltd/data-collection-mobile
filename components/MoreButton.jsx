import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { assets } from "../utils/assets";

const CustomBackButton = (props) => {
  const { handleAction, setHandleAction } = props

  const handleMoreAction = () => {
    setHandleAction(!handleAction)
  };

  return (
    <TouchableOpacity onPress={handleMoreAction} {...props}>
      <Image source={assets.ArrowBack} style={{ width: 43, height: 43 }} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;

import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, StyleSheet } from "react-native";
import { assets } from "../utils/assets";

const MoreBtn = (props) => {
  const { handleAction, setHandleAction } = props

  const handleMoreAction = () => {
    setHandleAction(!handleAction)
  };

  return (
    <TouchableOpacity onPress={handleMoreAction} {...props} style={styles.btn}>
      <Image source={assets.More} style={{ width: 26, height: 26 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 15,
  },
})
export default MoreBtn;

import { StyleSheet, TextInput } from "react-native";
import { borders } from "../utils/border";
import { colors } from "../utils/colors";

const OTPInput = (props) => {
  const { onChange, disabled } = props;
  return (
    <TextInput
      style={styles.TextInputOtp}
      maxLength={1}
      editable={!disabled}
      onChangeText={onChange}
      selectTextOnFocus
      contextMenuHidden
      keyboardType="decimal-pad"
    />
  );
};

const styles = StyleSheet.create({
  TextInputOtp: {
    ...borders("s", colors.ACCENT_DARK),
    width: "100%",
    backgroundColor: colors.LIGHT,
    aspectRatio: 58 / 44,
    alignItems: "center",
    justifyContent: "center",
    color: colors.PRIMARY,
    fontSize: 24,
    flex: 1,
  },
});

export default OTPInput;

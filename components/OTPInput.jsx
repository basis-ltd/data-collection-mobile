import React, { useState, useRef, forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { borders } from "../utils/border";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

const OTPInput = forwardRef((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      ref={ref}
      style={!isFocused ? styles.TextInputOtp : styles.textInputFocused}
      maxLength={1}
      selectTextOnFocus
      contextMenuHidden
      selectionColor={colors.ACCENT_DARK}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
});

const generalInputStyles = {
  ...borders("s", colors.ACCENT_DARK),
  width: "100%",
  backgroundColor: colors.LIGHT,
  aspectRatio: 58 / 44,
  alignItems: "center",
  justifyContent: "center",
  color: colors.PRIMARY,
  fontSize: 24,
  flex: 1,
  borderRadius: 7,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontFamily: fonts.MONTSERRAT_BOLD,
};

const styles = StyleSheet.create({
  TextInputOtp: {
    ...generalInputStyles,
  },
  textInputFocused: {
    ...generalInputStyles,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
  },
});

export default OTPInput;

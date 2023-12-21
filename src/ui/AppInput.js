import React from "react";
import PropTypes from "prop-types";
import { borders } from "../utils/border";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";

const AppInput = (props) => {
  const { iconUrl, labelText, placeholder, keyboardType, onChangeText } = props;
  return (
    <View style={styles.container}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <View style={styles.inputBox}>
        {iconUrl && (
          <Image style={styles.iconImage} source={iconUrl} alt="Input Icon" />
        )}
        <TextInput
          {...props}
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={[styles.input, props.style]}
          placeholderTextColor={colors.ACCENT_DARK}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

// proptypes:
AppInput.propTypes = {
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  labelText: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
};

// styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 0,
    flexDirection: "column",
    gap: 11,
    width: "100%",
  },
  label: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    backgroundColor: "transparent",
    width: "100%",
  },
  input: {
    padding: 0,
    flex: 1,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    color: colors.PRIMARY,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    backgroundColor: "transparent",
    fontSize: 15,
  },
  inputBox: {
    ...borders("s", colors.ACCENT_DARK),
    borderRadius: 5,
    height: 46,
    backgroundColor: colors.LIGHT,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    flexDirection: "row",
    gap: 15,
  },
  iconImage: {
    height: 24,
    aspectRatio: 1 / 1,
    width: "auto",
  },
});

export default AppInput;

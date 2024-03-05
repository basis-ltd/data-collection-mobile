import React from "react";
import PropTypes from "prop-types";
import { borders } from "../utils/border";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { View, StyleSheet, TextInput, Text } from "react-native";

const AppTextarea = (props) => {
  const {
    labelText,
    placeholder,
    onChangeText,
    error,
    value,
  } = props;

  return (
    <View style={styles.container}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <View style={styles.inputBox}>
        <TextInput
          {...props}
          placeholder={placeholder}
          keyboardType="default"
          style={[styles.input, props.style]}
          placeholderTextColor={colors.ACCENT_DARK}
          onChangeText={onChangeText}
          value={value}
          multiline
          numberOfLines={5}
        />
      </View>
      {error && <Text style={styles.error}> {error}</Text>}
    </View>
  );
};

// propTypes:
AppTextarea.propTypes = {
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  labelText: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    "default",
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
    height: "auto",
    backgroundColor: colors.LIGHT,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    flexDirection: "row",
    gap: 15,
  },
  error: {
    color: colors.ERROR,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: -2,
  },
});

export default AppTextarea;

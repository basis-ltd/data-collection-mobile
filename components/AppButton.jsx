import React, { FC } from "react";
import PropTypes from "prop-types";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";

const AppButton = (props) => {
  const { fullWidth, title, handleOnPress } = props;
  return (
    <TouchableOpacity
      style={fullWidth ? styles.button : styles.buttonShort}
      onPress={handleOnPress}
      {...props}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// protypes---
AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  handleOnPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
};

// styles ---
const styles = StyleSheet.create({
  // button
  button: {
    width: "100%",
    borderRadius: 5,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.PRIMARY,
  },
  buttonShort: {
    borderRadius: 5,
    height: 37,
    display: "flex",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.PRIMARY,
  },
  buttonText: {
    color: colors.LIGHT,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 18,
    textAlign: "center",
  },
});

export default AppButton;

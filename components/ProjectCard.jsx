import React from "react";
import PropTypes from "prop-types";
import { borders } from "../utils/border";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { assets } from "../utils/assets";

const ProjectCard = (props) => {

  return (
    <View style={styles.projectCardContainer}>
      <Image style={styles.iconImage} source={assets.BlueBox} alt="Project Icon" />
      <View style={styles.middleBox}>
        <Text style={styles.projectTitle}>Project</Text>
        <Text style={styles.projectName}>Stadium survey</Text>
        <Text style={styles.projectTitle}>Status</Text>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.projectTitle}>Assigned at</Text>
        <Text style={styles.date}>Stadium survey</Text>
        <Text style={true ? styles.active : styles.inactive}>Active</Text>
      </View>
      <Image style={styles.iconImage} source={assets.AddIcon} alt="Add Icon" />
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  projectCardContainer: {
    backgroundColor: colors.LIGHT,
    paddingVertical: 15,
    flexDirection: "row",
    gap: 12,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: colors.ACCENT_LIGHT,
    borderWidth: 2,
    paddingHorizontal: 12
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  middleBox: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    flex: 1
  },
  projectTitle: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 14,
  },
  projectName: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 12,
  },
  date: {
    color: colors.SUCCESS,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 12,
  },
  active: {
    color: colors.BLUE,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 12,
  },
  inactive: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 12,
    backgroundColor: colors.ERROR,
    padding: 10,
  }
});

export default ProjectCard;

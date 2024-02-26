import React from "react";
import { borders } from "../utils/border";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { assets } from "../utils/assets";
import { formatDate } from "../helpers/formatDate";
import { useDispatch } from "react-redux";
import { setProjectLists, setProjectId } from "../app/projects/projectSlice";

const ProjectCard = (props) => {
  const { project } = props;
  const dispatch = useDispatch()

  const handlePressProject = () => {
    dispatch(setProjectLists(false));
    dispatch(setProjectId(project.id));
  }

  return (
    <TouchableOpacity style={styles.projectCardContainer} onPress={handlePressProject}>
      <Image style={styles.iconImage} source={assets.BlueBox} alt="Project Icon" />
      <View style={styles.middleBox}>
        <Text style={styles.projectTitle}>Project</Text>
        <Text style={styles.projectName}>{project?.title || "N/A"}</Text>
        <Text style={styles.projectTitle}>Status</Text>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.projectTitle}>Assigned at</Text>
        <Text style={styles.date}>{formatDate(project?.start_date || project?.createdAt || "wrong Date")}</Text>
        <Text style={project?.isActive ? styles.active : styles.inactive}>{project?.isActive ? "Active" : "Inactive"}</Text>
      </View>
      <Image style={styles.iconImage} source={assets.AddIcon} alt="Add Icon" />
    </TouchableOpacity>
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
    alignItems: "center",
    ...borders("s", colors.ACCENT_LIGHT),
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  middleBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flex: 1
  },
  projectTitle: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 14,
    width: "100%",
  },
  projectName: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 12,
    width: "100%",
  },
  date: {
    color: colors.SUCCESS,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 12,
    width: "100%",
  },
  active: {
    color: colors.BLUE,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 12,
    backgroundColor: "#F3FCFF",
    borderRadius: 5,
    padding: 10,
  },
  inactive: {
    color: colors.ERROR,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 12,
    backgroundColor: colors.ERROR_ACCENT,
    padding: 10,
    borderRadius: 5,
    width: "fit-content",
    flex: 0,
  }
});

export default ProjectCard;

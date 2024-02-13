import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";


const Projects = () => {

  return (
    <PageGuard style={styles.projects}>
      <Text>Projects list</Text>
    </PageGuard>
  );
};

const styles = StyleSheet.create({
  projects: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.LIGHT,
    padding: 24,
    gap: 10,
    alignItems: "center",
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
});

export default Projects;

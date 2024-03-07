import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import ProjectsHome from "./components/ProjectsHome";
import SingleProject from "./components/singleProject";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const Projects = () => {
  const { showProjectsList } = useSelector(state => state.projectsReducers);
  const { projectId } = useSelector(state => state.projectsReducers);

  return (
    <PageGuard style={styles.projects}>
      {showProjectsList && <ProjectsHome />}
      {!showProjectsList && projectId && <SingleProject />}
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
    flexDirection: "column",
    gap: 19,
    height: "100%",
  },

});

export default Projects;



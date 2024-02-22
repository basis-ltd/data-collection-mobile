import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import ProjectsHome from "./components/ProjectsHome";
import { StyleSheet } from "react-native";


const Projects = () => {


  return (
    <PageGuard style={styles.projects}>
      <ProjectsHome />
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



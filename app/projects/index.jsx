import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import { Picker } from '@react-native-picker/picker';
import { assets } from "../../utils/assets";
import { borders } from "../../utils/border"
import ProjectCard from "../../components/ProjectCard";


const Projects = () => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <PageGuard style={styles.projects}>
      <Text style={styles.title}>List of your assigned projects</Text>
      <View style={styles.filterWrapper}>
        <View style={styles.filterLeftTitle}>
          <Image style={styles.icon} source={assets.Filter} alt="Filter Icon" />
          <Text style={styles.filter}>Filter</Text>
        </View>
        <View style={styles.select}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Inactive" value="inactive" />
          </Picker>
        </View>
      </View>
      <View style={styles.allProjects}>
        {[1, 2, 3, 4, 5].map((project, index) => {
          return <ProjectCard key={index} project={project} />
        })}

      </View>
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
    overflow: "hidden",
  },
  title: {
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 16,
    color: colors.DARK,
    textAlign: "left",
    width: "100%",
    marginTop: 40,
  },
  filterWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  filterLeftTitle: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  icon: {
    width: 17,
    height: 17,
  },
  filter: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 16,
  },
  select: {
    ...borders("s", colors.ACCENT_LIGHT),
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: colors.GRAY,
    width: "30%"
  },
  allProjects: {
    flex: 1,
    gap: 11,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflowY: "auto",
  }


});

export default Projects;

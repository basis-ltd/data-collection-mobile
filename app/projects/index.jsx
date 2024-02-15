import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import { Picker } from '@react-native-picker/picker';
import { assets } from "../../utils/assets";
import { borders } from "../../utils/border"
import ProjectCard from "../../components/ProjectCard";
import RNPickerSelect from 'react-native-picker-select';
import AppCustomSelect from "../../components/AppCustomSelect";


const Projects = () => {
  const [selectedValue, setSelectedValue] = useState('Status');

  const options = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    // Add more options as needed
  ];

  return (
    <PageGuard style={styles.projects}>
      <Text style={styles.title}>List of your assigned projects</Text>
      <View style={styles.filterWrapper}>
        <View style={styles.filterLeftTitle}>
          <Image style={styles.icon} source={assets.Filter} alt="Filter Icon" />
          <Text style={styles.filter}>Filter</Text>
        </View>
        <View style={styles.select}>
          <AppCustomSelect
            options={options}
            onSelect={(value) => setSelectedValue(value)}
            title="Status"
          />
        </View>

      </View>
      <ScrollView contentContainerStyle={styles.allProjectsScroll}>
        <View style={styles.allProjects}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((project, index) => {
            return <ProjectCard key={index} project={project} />
          })}
        </View>
      </ScrollView>
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
    width: "35%",
    padding: 0,
  },
  allProjectsScroll: {
    width: "100%",
    padding: 0,
  },
  allProjects: {
    flex: 1,
    gap: 11,
    padding: 0,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },


});

export default Projects;



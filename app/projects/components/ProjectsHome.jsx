import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import { assets } from "../../../utils/assets";
import ProjectCard from "../../../components/ProjectCard";
import AppCustomSelect from "../../../components/AppCustomSelect";
import useFetchData from "../../../hooks/useFetchData";
import { backendAPI } from "../../../api/backendApi";
import AppLoadingSpin from "../../../components/AppLoadingSpin";


const ProjectsHome = () => {
    const [selectedValue, setSelectedValue] = useState('Status');
    const [projectList, setProjectList] = useState([]);
    const { data, error, loading, handler } = useFetchData()

    useEffect(() => {
        handler(backendAPI.allProjectsList(10, 0))
    }, []);

    useEffect(() => {
        if (data && !loading) {
            setProjectList(data?.data?.rows || [])
        }

    }, [data, !loading])

    const options = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];

    // handle filter projects
    useEffect(() => {
        if (selectedValue === 'active') {
            setProjectList(projectList.filter(project => project.isActive))
        }
        else if (selectedValue === 'inactive') {
            setProjectList(projectList.filter(project => !project.status))
        }
    }, [selectedValue]);

    return (
        <View style={styles.projectsHome}>
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
            <ScrollView
                contentContainerStyle={styles.allProjectsScroll}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.allProjects}>
                    {loading && <AppLoadingSpin />}
                    {error && !loading && <Text style={styles.error}>{error?.message || error[0]}</Text>}
                    {!error && !loading && data && data?.data &&
                        projectList?.map((project, index) => {
                            return <ProjectCard key={index} project={project} />
                        })}
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    projectsHome: {
        width: "100%",
        flex: 1,
        backgroundColor: colors.LIGHT,
        padding: 0,
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
    error: {
        fontFamily: fonts.MONTSERRAT_REGULAR,
        fontSize: 14,
        color: colors.ERROR,
        textAlign: "center",
        width: "100%",
        alignItems: "center",
    },
});

export default ProjectsHome;



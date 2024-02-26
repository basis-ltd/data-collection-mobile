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
import { useSelector } from "react-redux";


const SingleProject = () => {
    const { projectId } = useSelector(state => state.projectsReducers);
    const [singleProjectId, setSingleProjectId] = useState(projectId || null)
    const { data, error, loading, handler } = useFetchData()


    useEffect(() => {
        setSingleProjectId(projectId)
    }, [singleProjectId]);

    useEffect(() => {
        handler(backendAPI.singleProject(singleProjectId))
    }, []);



    return (
        <View style={styles.singleProject}>
            {loading && <AppLoadingSpin />}
            {error && !loading && <Text style={styles.error}>{error || error[0]}</Text>}
            <Text>Single Project</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    singleProject: {
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
    error: {
        fontFamily: fonts.MONTSERRAT_REGULAR,
        fontSize: 14,
        color: colors.ERROR,
        textAlign: "center",
        width: "100%",
        alignItems: "center",
    },
});

export default SingleProject;



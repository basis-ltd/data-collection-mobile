import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import { assets } from "../../../utils/assets";
import useFetchData from "../../../hooks/useFetchData";
import { backendAPI } from "../../../api/backendApi";
import AppLoadingSpin from "../../../components/AppLoadingSpin";
import { useDispatch, useSelector } from "react-redux";
import AppError from "../../../components/AppError";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setProjectId, setProjectLists } from "../projectSlice";
import SingleField from "../../../components/SingleField";


const SingleProject = () => {
    const { projectId } = useSelector(state => state.projectsReducers);
    const [singleProjectId, setSingleProjectId] = useState(projectId || null)
    const { data, error, loading, handler } = useFetchData();
    const { data: dataForm, error: errorForm, loading: loadingForm, handler: fetchForm } = useFetchData();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading && data) {
            fetchForm(backendAPI.singleFrom(data.data.form[0]?.id));
        }
    }, [data, loading]);

    useEffect(() => {
        setSingleProjectId(projectId)
    }, [singleProjectId]);

    useEffect(() => {
        handler(backendAPI.singleProject(singleProjectId))
    }, [singleProjectId]);

    const handleGoBack = () => {
        dispatch(setProjectLists(true));
        dispatch(setProjectId(null));
    }

    return (
        <SafeAreaView style={styles.singleProject}>
            {loading && <AppLoadingSpin />}
            {error && !loading && <AppError message={error || "Error with fetch single Project"} />}
            {!loading &&
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} >
                        <Image source={assets.ArrowBack} style={{ width: 43, height: 43 }} />
                    </TouchableOpacity>
                </View>
            }
            {!loading && data && data.data && data.data.form[0] &&
                <View style={styles.bodyContent}>
                    <Text style={styles.title}>{data.data.form[0]?.name}</Text>
                    <Text style={styles.description}>{data.data.form[0]?.description}</Text>
                    {loadingForm && <View style={styles.loadingFormData}><Text style={styles.loadingTitle}>Loading from Data...</Text></View>}
                    {!loadingForm && dataForm &&
                        <ScrollView contentContainerStyle={styles.formData}>
                            {dataForm.data.sections?.map(section => {
                                return (
                                    <View key={section.id} style={styles.singleSection}>
                                        <Text style={styles.sectionTitle}>{section.name} Section</Text>
                                        {section.fields && section.fields?.length > 0 &&
                                            section.fields.map(field => {
                                                return <SingleField key={field.id} field={field} />
                                            })
                                        }
                                    </View>
                                )
                            })}
                        </ScrollView>
                    }
                </View>
            }
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    singleProject: {
        width: "100%",
        flex: 1,
        backgroundColor: colors.LIGHT,
        padding: 0,
        paddingTop: 10,
        gap: 10,
        alignItems: "center",
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        flexDirection: "column",
        gap: 19,
        height: "100%",
    },
    bodyContent: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 0,
        gap: 10,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        width: "100%",
    },
    title: {
        fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
        fontSize: 16,
        color: colors.PRIMARY,
        textAlign: "left",
        width: "100%",
    },
    header: {
        textAlign: "left",
        width: "100%",
        alignItems: "flex-start",
    },
    description: {
        fontFamily: fonts.MONTSERRAT_REGULAR,
        fontSize: 13,
        color: colors.GRAY,
        textAlign: "left",
        width: "100%",
    },
    formData: {
        marginTop: 10,
        gap: 10,
        width: "100%",
        padding: 0,
        paddingBottom: 20

    },
    loadingFormData: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    loadingTitle: {
        color: colors.PRIMARY,
        fontFamily: fonts.MONTSERRAT_BOLD,
        fontSize: 18,
        textAlign: "center",
        alignItems: "flex-start",
    },
    sectionTitle: {
        fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
        fontSize: 16,
        color: colors.DARK,
        textAlign: "left",
        width: "100%",
        textTransform: "capitalize",
    },
    singleSection: {
        gap: 10,
    }
});

export default SingleProject;



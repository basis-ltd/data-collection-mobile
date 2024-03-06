import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import SingleField from "./fieldDataComponents/SingleField";
import AppButton from '../../../components/AppButton';
import { dummyData } from "./dummyData";


const FormDisplay = (props) => {
    const { dataForm, handleNextPage, handleBackPage } = props;

    // manage form actions functions
    const handlePreviewForm = () => {

    }

    return (
        <ScrollView contentContainerStyle={styles.formData}>
            <View style={styles.formDataWrapper}>
                {dataForm.data.sections?.map(section => {
                    return (
                        <View key={section.id} style={styles.singleSection}>
                            <Text style={styles.sectionTitle}>{section.name} Section</Text>
                            {section.fields && section.fields?.length > 0 &&
                                [...section.fields, ...dummyData]?.map(field => {
                                    return <SingleField key={field.id} field={field} />
                                })
                            }
                        </View>
                    )
                })}
                <View style={styles.formActions}>
                    <AppButton
                        fullWidth={false}
                        title='Preview'
                        handleOnPress={handlePreviewForm}
                    />
                    <AppButton
                        fullWidth={false}
                        title='Back'
                        handleOnPress={handleBackPage}
                    />
                    <AppButton
                        fullWidth={false}
                        title='Next'
                        handleOnPress={handleNextPage}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    formData: {
        width: "100%",
        padding: 0,
    },
    formDataWrapper: {
        padding: 0,
        gap: 10,
        width: "100%",
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
        padding: 0,
        marginBottom: 10,
    },
    formActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 30,
    }
});

export default FormDisplay;
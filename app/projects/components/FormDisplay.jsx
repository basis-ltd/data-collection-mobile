import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import SingleField from "./fieldDataComponents/SingleField";
import AppButton from '../../../components/AppButton';
import { dummyData } from "./dummyData";
import { useRef, useState } from "react";
import FieldtypesWithTypes from "./fieldDataComponents/AllFieldTypes";

const FormDisplay = (props) => {
    const { dataForm, handleNextPage, handleBackPage } = props;
    const formSubmitRef = useRef([]);
    const [isFormSubmited, setIsFormSubmited] = useState(false)


    // manage form actions functions
    const handlePreviewForm = () => {
        formSubmitRef.current?.forEach(element => element ? element.onPress() : null)
    }

    return (
        <ScrollView
            contentContainerStyle={styles.formData}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.formDataWrapper}>
                {dataForm.data.sections?.map(section => {
                    return (
                        <View key={section.id} style={styles.singleSection}>
                            <Text style={styles.sectionTitle}>{section.name} Section</Text>
                            {section.fields && section.fields?.length > 0 &&
                                [...section.fields, ...dummyData]?.map((field, index) => {
                                    return (
                                        <SingleField key={field.id} formSubmitRef={formSubmitRef} isFormSubmited={isFormSubmited}>
                                            <FieldtypesWithTypes field={field} inputIndex={index} />
                                        </SingleField>
                                    )
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
                    {/* This is for Demo if  we make a paginated api for form fields. but this is working well for now  too */}

                    {/* <AppButton
                        fullWidth={false}
                        title='Back'
                        handleOnPress={handleBackPage}
                    />
                    <AppButton
                        fullWidth={false}
                        title='Next'
                        handleOnPress={handleNextPage}
                    /> */}
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
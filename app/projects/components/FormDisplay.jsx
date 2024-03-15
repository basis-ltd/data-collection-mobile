import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import SingleField from "./fieldDataComponents/SingleField";
import AppButton from '../../../components/AppButton';
import { useEffect, useRef, useState } from "react";
import FieldtypesWithTypes from "./fieldDataComponents/AllFieldTypes";
import { useSelector } from "react-redux";
import FormPreview from './FormPreview'
import AppPopUp from "../../../components/AppPopUp";

const FormDisplay = (props) => {
    const { dataForm, handleNextPage, handleBackPage } = props;
    const formSubmitRef = useRef([]);
    const [isFormSubmited, setIsFormSubmited] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [allFields, setAllFields] = useState([]);
    const { formValues } = useSelector(state => state.formDataReducers);

    // manage form actions functions
    const handlePreviewForm = () => {
        formSubmitRef.current?.forEach(element => element ? element.onPress() : null);
        //if all fields are filled, then we can launch Preview
        // if (formValues.length === allFields.length) {
        setShowPreview(true)
        // }
    }

    //close Modal
    const hidePreview = () => {
        setShowPreview(false)
    }

    console.log(showPreview, 'showPreview')

    const handleCountFields = (field) => {
        const previousFields = allFields?.filter(item => item.id !== field.id);
        setAllFields([...previousFields, field])
    }

    return (
        <ScrollView
            contentContainerStyle={styles.formData}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.formDataWrapper}>
                {dataForm.data?.map(section => {
                    return (
                        <View key={section.id} style={styles.singleSection}>
                            <Text style={styles.sectionTitle}>{section.name} Section</Text>
                            {section.fields && section.fields?.length > 0 &&
                                section.fields?.map((field, index) => {
                                    //count fields that are mandatory to be filled
                                    useEffect(() => {
                                        if (field.is_required) {
                                            handleCountFields(field)
                                        }
                                    }, [field]);

                                    return (
                                        <SingleField key={field.id} formSubmitRef={formSubmitRef} isFormSubmited={isFormSubmited}>
                                            <FieldtypesWithTypes key={field.id} field={{ ...field, sectionName: section.name }} inputIndex={index} />
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
                {/* HOW PREVIEW FORM */}
                {showPreview &&
                    <AppPopUp handleClose={hidePreview} showPreview={showPreview}>
                        <FormPreview setIsFormSubmited={setIsFormSubmited} handleClose={hidePreview} />
                    </AppPopUp>
                }
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
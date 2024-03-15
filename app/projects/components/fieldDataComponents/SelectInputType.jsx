import { StyleSheet, Text, View, Pressable } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import { borders } from "../../../../utils/border";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { FormikSubmitContext } from "./SingleField";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues } from "./formDataSlice";


const SelectInputType = (props) => {
    const { field, inputIndex } = props;
    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);
    const { formValues } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.string()
            .required("You must select one") : Yup.string(),
    });


    const handleSubmitForm = (values) => {
        console.log(values, 'valuesss')
        //first remove the value with these fields
        const previousValues = formValues?.filter(item => item.field_id !== field.id);
        const fieldValues = {
            field_id: field.id,
            value: values.value,
            is_required: field.is_required,
            label: field.label,
            sectionName: field.sectionName,
        }
        dispatch(setFormValues([...previousValues, fieldValues]))
    };

    return (
        <Formik
            initialValues={{ value: !field.default_value || field.default_value !== '' ? field.default_value : field.options?.split(',')[0] }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
        >
            {({ errors, values, setFieldValue, resetForm, handleSubmit }) => {
                //clear form
                useEffect(() => {
                    if (isFormSubmited) {
                        resetForm();
                    }
                }, [isFormSubmited]);

                return (
                    <View style={styles.formikContainer}>
                        {field.label && <Text style={styles.label}>{field.label}</Text>}
                        <View style={styles.selectWrapper}>
                            <Picker
                                selectedValue={values.value}
                                onValueChange={(itemValue, _) => setFieldValue('value', itemValue)}
                                style={styles.selectedValue}
                            >
                                {field.options?.split(',').map((option, index) => (
                                    <Picker.Item label={option} value={option} key={`${option}_${index}`} style={styles.optonValue} />
                                ))}
                            </Picker>
                        </View>
                        <Pressable
                            ref={(el) => (formSubmitRef.current[field.id] = { handleSubmit, })}
                            style={styles.submitBtnInvisible}>
                            <Text>Submit</Text>
                        </Pressable>
                        {errors.value && <Text style={styles.error}>{errors.value}</Text>}
                    </View>
                );
            }}
        </Formik>
    );
};

const styles = StyleSheet.create({
    formikContainer: {
        padding: 0,
        flex: 1,
        width: "100%",
        margin: 0,
        flexDirection: "column",
        gap: 10,

    },
    selectWrapper: {
        ...borders("s", colors.ACCENT_DARK),
        width: "100%",
        borderRadius: 5,
    },
    selectedValue: {
        color: colors.ACCENT_DARK,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
    },
    optonValue: {
        color: colors.ACCENT_DARK,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
    },
    error: {
        color: colors.ERROR,
        fontFamily: fonts.MONTSERRAT_BOLD,
        fontSize: 12,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: -2,
    },
    label: {
        color: colors.DARK,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
        backgroundColor: "transparent",
        width: "100%",
    },
    submitBtnInvisible: {
        opacity: 0,
        width: 0,
        height: 0,
    }
});

export default SelectInputType;

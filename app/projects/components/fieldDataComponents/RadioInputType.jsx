import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { FormikSubmitContext } from "./SingleField";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues } from "./formDataSlice";


const RadioInputType = ({ field, inputIndex }) => {
    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);
    const { formValues } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.string()
            .required("You must select one") : Yup.string(),
    });


    const handleSubmitForm = (values) => {
        //first remove the value with these fields
        const previousValues = formValues?.filter(item => item.field_id !== field.id);
        const fieldValues = {
            field_id: field.id,
            value: values.value,
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
                        <View>
                            {field.options?.split(',').map((option, index) => (
                                <TouchableOpacity
                                    key={`${option}_${index}`}
                                    onPress={() => {
                                        setFieldValue('value', option)
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}>
                                    <View
                                        style={styles.radioBox}>
                                        {values.value === option && (
                                            <View
                                                style={styles.radionSelected}
                                            />
                                        )}
                                    </View>
                                    <Text>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Pressable
                            ref={(el) => (formSubmitRef.current[inputIndex] = { onPress: () => { handleSubmit() } })}
                            onPress={handleSubmit}
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
    radioBox: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radionSelected: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    submitBtnInvisible: {
        opacity: 0,
        width: 0,
        height: 0,
    }
});

export default RadioInputType;

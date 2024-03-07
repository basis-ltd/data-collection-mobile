import { StyleSheet, Text, View, Button } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import { borders } from "../../../../utils/border";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { FormikSubmitContext } from "../FormDisplay";

const SelectInputType = (props) => {
    const { field } = props;
    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.string()
            .required("You must select one") : Yup.string(),
    });

    const handleSubmit = (values) => {
        console.log(values, 'selected values on select')
    }

    return (
        <Formik
            initialValues={{ value: !field.default_value || field.default_value !== '' ? field.default_value : field.options?.split(',')[0] }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, values, setFieldValue, resetForm }) => {
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
                        <Button type='submit' ref={formSubmitRef} hidden onPress={handleSubmit}>Bubmit</Button>
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
});

export default SelectInputType;
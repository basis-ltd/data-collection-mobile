import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import * as Yup from "yup";
import { useContext } from "react";
import { FormikSubmitContext } from "../FormDisplay";



const RadioInputType = ({ field }) => {
    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.string()
            .required("You must select one") : Yup.string(),
    });

    const handleSubmit = (values) => {
        console.log('radios selected values', values)
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
    }
});

export default RadioInputType;
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import { useState } from "react";
import * as Yup from "yup";



const RadioInputType = ({ field }) => {

    const [selected, setSelected] = useState(null);

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.string()
            .required("You must select one") : Yup.string(),
    });

    const onSelect = valueSelected => {
        console.log(valueSelected, 'Selected values')

    }

    const handleSubmit = (values) => {
        console.log('radios selected values', values)
    }

    return (
        <Formik
            initialValues={{ value: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, values, handleChange }) => {
                return (
                    <View style={styles.formikContainer}>
                        {field.label && <Text style={styles.label}>{field.label}</Text>}
                        <View>
                            {field.options?.split(',').map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => {
                                        setSelected(option.value);
                                        onSelect(option.value);
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}>
                                    <View
                                        style={styles.radioBox}>
                                        {selected === option.value && (
                                            <View
                                                style={styles.radionSelected}
                                            />
                                        )}
                                    </View>
                                    <Text>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
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
        height: "100%",
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
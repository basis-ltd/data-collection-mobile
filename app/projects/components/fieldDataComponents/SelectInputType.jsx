import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import { Picker } from "@react-native-picker/picker";
import * as Yup from "yup";
import { useState } from "react";



const SelectInputType = (props) => {
    const { field } = props;

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.string()
            .required("You must select one") : Yup.string(),
    });

    const [selectedValue, setSelectedValue] = useState('')

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
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            {field.options?.split(',').map((item, index) => (
                                <Picker.Item label={item} value={item} key={index} />
                            ))}
                        </Picker>
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
});

export default SelectInputType;
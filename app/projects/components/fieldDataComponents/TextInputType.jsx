import { StyleSheet, View, Pressable, Text } from "react-native";
import AppInput from "../../../../components/AppInput";
import { Formik } from "formik";
import { inputTypes } from "../../../../constants/inputTypes";
import { inputValidationSchema } from "../../../../utils/validationchemas";
import { returnKeyBoardtype } from "../../../../utils/returnKeyBoardType"
import AppTextarea from "../../../../components/AppTextarea";
import { useContext, useEffect } from "react";
import { FormikSubmitContext } from "./SingleField";


const TextInputType = ({ field, inputIndex }) => {

    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);

    const handleSubmitForm = (values) => {
        console.log(values, 'test values')
    };

    const validationSchema = inputValidationSchema(field);

    return (
        <Formik
            initialValues={{ value: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
        >
            {({ errors, values, resetForm, handleChange, handleSubmit }) => {

                useEffect(() => {
                    if (isFormSubmited) {
                        resetForm()
                    }
                }, [isFormSubmited]);

                return (
                    <View style={styles.formikContainer}>
                        {field.field_type !== inputTypes.textarea &&
                            <AppInput
                                iconUrl={null}
                                placeholder={field.placeholder}
                                keyboardType={returnKeyBoardtype(field.field_type)}
                                error={errors.value}
                                value={values.value}
                                onChangeText={handleChange("value")}
                                labelText={field.label}
                            />
                        }
                        {field.field_type === inputTypes.textarea &&
                            <AppTextarea
                                placeholder={field.placeholder}
                                error={errors.value}
                                value={values.value}
                                onChangeText={handleChange("value")}
                                labelText={field.label}
                            />
                        }
                        <Pressable
                            ref={(el) => (formSubmitRef.current[inputIndex] = { onPress: () => { handleSubmit() } })}
                            onPress={handleSubmit}
                            style={styles.submitBtnInvisible}>
                            <Text>Submit</Text>
                        </Pressable>
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
        gap: 10,
        height: 'auto',
        backgroundColor: 'transparent'
    },
    submitBtnInvisible: {
        opacity: 0,
        width: 0,
        height: 0,
    }
});

export default TextInputType;

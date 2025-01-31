import { StyleSheet, View, Pressable, Text } from "react-native";
import AppInput from "../../../../components/AppInput";
import { Formik } from "formik";
import { inputTypes } from "../../../../constants/inputTypes";
import { inputValidationSchema } from "../../../../utils/validationchemas";
import { returnKeyBoardtype } from "../../../../utils/returnKeyBoardType"
import AppTextarea from "../../../../components/AppTextarea";
import { useContext, useEffect } from "react";
import { FormikSubmitContext } from "./SingleField";
import { setFormErrors, setFormValues } from "./formDataSlice";
import { useDispatch, useSelector } from "react-redux";


const TextInputType = ({ field }) => {

    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);
    const { formValues, formErrors } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()

    const handleSubmitForm = (values) => {
        //first remove the value with these fields
        const previousValues = formValues?.filter(item => item.field_id !== field.id);
        const fieldValues = {
            field_id: field.id,
            value: values.value,
            label: field.label,
            is_required: field.is_required,
            sectionName: field.sectionName,
        }
        dispatch(setFormValues([...previousValues, fieldValues]))
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

                //watch errors
                useEffect(() => {
                    if (errors.value) {
                        dispatch(setFormErrors([...formErrors, `error_id_:_${field.id}`]))
                    } else {
                        dispatch(setFormErrors(formErrors.filter(item => item !== `error_id_:_${field.id}`)))
                    }
                }, [errors.value]);

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
                            ref={(el) => (formSubmitRef.current[field.id] = { handleSubmit, })}
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

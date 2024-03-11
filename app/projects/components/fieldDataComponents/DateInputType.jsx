import React, { useContext, useState, useEffect } from 'react';
import { View, Pressable, Platform, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from "yup";
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
import { borders } from '../../../../utils/border';
import { assets } from '../../../../utils/assets';
import { Formik } from "formik";
import { formatDate } from '../../../../helpers/formatDate';
import { FormikSubmitContext } from "./SingleField";
import { useDispatch, useSelector } from 'react-redux';
import { setFormValues } from './formDataSlice';


const DateInputType = ({ field, inputIndex }) => {
    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);
    const { formValues } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()

    const handleSubmitForm = (values) => {
        //first remove the value with these fields
        const previousValues = formValues?.filter(item => item.field_id !== field.id);
        const fieldValues = {
            field_id: field.id,
            value: values.value.toISOString(),
            label: field.label,
            sectionName: field.sectionName,
        }
        dispatch(setFormValues([...previousValues, fieldValues]))
    };

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.date()
            .required("Date is required") : Yup.date(),
    });

    return (
        <Formik
            initialValues={{ value: new Date() }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
        >
            {({ setFieldValue, values, errors, resetForm, handleSubmit }) => {
                const [show, setShow] = useState(false);

                const showDatepicker = () => {
                    setShow(true);
                };

                const onChange = (event, selectedDate) => {
                    const currentDate = selectedDate || values.value;
                    setShow(Platform.OS === 'ios');
                    setFieldValue('value', currentDate);
                };

                //clear form
                useEffect(() => {
                    if (isFormSubmited) {
                        resetForm();
                    }
                }, [isFormSubmited]);

                return (
                    <View style={styles.formikContainer}>
                        {field.label && <Text style={styles.label}>{field.label}</Text>}
                        <View style={styles.dateWrapper}>
                            <TouchableOpacity onPress={showDatepicker} style={styles.launchDateBtn}>
                                <Image style={styles.iconImage} source={assets.DateIcon} alt="Date Icon" />
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={values.value}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <Text style={styles.selectedDate}>{formatDate(values.value)}</Text>
                        </View>
                        {errors.value && <Text style={styles.error}> {errors.value}</Text>}
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
        width: "100%",
        margin: 0,
        flexDirection: "column",
        gap: 11,
        backgroundColor: colors.LIGHT,
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
    selectedDate: {
        color: colors.ACCENT_DARK,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
    },
    dateWrapper: {
        padding: 0,
        width: "100%",
        margin: 0,
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
        ...borders("s", colors.ACCENT_DARK),
        borderRadius: 5,
        backgroundColor: colors.LIGHT,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    launchDateBtn: {
        padding: 10,
        backgroundColor: 'transparent'
    },
    iconImage: {
        width: 30,
        height: 30,
    },
    submitBtnInvisible: {
        opacity: 0,
        width: 0,
        height: 0,
    }
});

export default DateInputType;

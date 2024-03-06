import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from "yup";
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
import { borders } from '../../../../utils/border';
import { assets } from '../../../../utils/assets';

import { Formik } from "formik";
import { formatDate } from '../../../../helpers/formatDate';

const DateInputType = ({ field }) => {

    const handleSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.date()
            .required("Date is required") : Yup.date(),
    });

    return (
        <Formik
            initialValues={{ value: new Date() }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ setFieldValue, values, errors }) => {
                const [show, setShow] = useState(false);

                const showDatepicker = () => {
                    setShow(true);
                };

                const onChange = (event, selectedDate) => {
                    const currentDate = selectedDate || values.value;
                    setShow(Platform.OS === 'ios');
                    setFieldValue('value', currentDate);
                };

                return (
                    <View style={styles.formikContainer}>
                        {field.label && <Text style={styles.label}>{field.label}</Text>}
                        <View style={styles.dateWrapper}>
                            <TouchableOpacity onPress={showDatepicker}>
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
        padding: 10,
        paddingHorizontal: 15,
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
    iconImage: {
        width: 30,
        height: 30,
    }
});

export default DateInputType;

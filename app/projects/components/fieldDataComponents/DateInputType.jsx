import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Yup from "yup";
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';
import { borders } from '../../../../utils/border';

const DateInputType = ({ field }) => {

    const handleSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = Yup.object({
        value: field.field_type ? Yup.date()
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
                        <Button onPress={showDatepicker} title="Select a date" />
                        {field.label && <Text style={styles.label}>{field.label}</Text>}
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
        flex: 1,
        width: "100%",
        height: "100%",
        margin: 0,
        flexDirection: "column",
        gap: 10,
        ...borders("s", colors.ACCENT_DARK),
        borderRadius: 5,
        backgroundColor: colors.LIGHT,
        alignItems: "center",
        justifyContent: "flex-start",
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

export default DateInputType;

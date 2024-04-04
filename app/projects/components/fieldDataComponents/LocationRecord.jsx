import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';
import { colors } from '../../../../utils/colors';
import AppButton from '../../../../components/AppButton';
import { fonts } from '../../../../utils/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { FormikSubmitContext } from './SingleField';
import { setFormValues } from './formDataSlice';

const LocationRecord = ({ field }) => {
    const [location, setLocation] = useState(null);
    const { formSubmitRef } = useContext(FormikSubmitContext);
    const { formValues } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()
    const [locationErrors, setLocationErros] = useState('');


    const askPermissionLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationErros('Permission to access location was denied');
            return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);

    }
    useEffect(() => {
        askPermissionLocation();
    }, []);


    const requestPermission = () => {
        askPermissionLocation();
    }

    // submit form locations
    const handleSubmitForm = () => {
        //first remove the value with these fields
        const previousValues = formValues?.filter(item => item.field_id !== field.id);
        const fieldValues = {
            field_id: field.id,
            value: JSON.stringify({ long: location['longitude'], lat: location['latitude'] }),
            label: field.label,
            is_required: field.is_required,
            sectionName: field.sectionName,
        }
        dispatch(setFormValues([...previousValues, fieldValues]))
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{field.label}</Text>
            {location &&
                <Text style={styles.location}>{JSON.stringify({ longitude: location['longitude'], latitude: location['latitude'] })}</Text>
            }
            {!location && <AppButton title="Record Location" handleOnPress={requestPermission} fullWidth={true} />}
            {locationErrors && <Text style={styles.error}>{locationErrors}</Text>}
            <Pressable
                ref={(el) => (formSubmitRef.current[field.id] = { handleSubmit: handleSubmitForm, })}
                style={styles.submitBtnInvisible}>
                <Text>Submit</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        width: "100%",
        margin: 0,
        flexDirection: "column",
        gap: 11,
        backgroundColor: colors.LIGHT,
    },
    label: {
        color: colors.DARK,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
        backgroundColor: "transparent",
        width: "100%",
    },
    location: {
        width: '100%',
        color: colors.PRIMARY,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
    },
    submitBtnInvisible: {
        opacity: 0,
        width: 0,
        height: 0,
    },
    error: {
        color: colors.ERROR,
        fontFamily: fonts.MONTSERRAT_BOLD,
        fontSize: 12,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: -1,
    },
});

export default LocationRecord;

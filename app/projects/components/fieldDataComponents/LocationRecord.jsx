import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { colors } from '../../../../utils/colors';

const LocationRecord = ({ field, inputIndex }) => {
    const [location, setLocation] = useState(null);
    const [locationErrors, setLocationErros] = useState(null);


    const askPermissionLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocationErros('Permission to access location was denied');
            return;
        }

        let locations = await Location.getCurrentPositionAsync({});
        setLocation(locations);

    }
    useEffect(() => {
        askPermissionLocation();
    }, []);

    const shareLocation = async () => {
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
    };

    const requestPermission = () => {
        askPermissionLocation();
    }


    console.log(location, 'tests  location');

    return (
        <View style={styles.container}>
            {location ? (
                <Button title="Share My Location" onPress={shareLocation} />
            ) : (
                <Button title="Request Permission" onPress={requestPermission} />
            )}
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
});

export default LocationRecord;

import React, { useEffect } from "react";
import { fonts } from "../utils/fonts";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../app/login/phoneNumber.slice";
import { router } from "expo-router";
import { frontendAPI } from "../api/frontendApi";
import useIsUSerLoggedIn from "../hooks/useIsUSerLoggedIn";
import AppLoadingSpin from "./AppLoadingSpin";

const PageGuard = ({ children, ...props }) => {
    const { token, isLoading } = useIsUSerLoggedIn();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && !token) {
            router.push(frontendAPI.Login);
            dispatch(setLoggedIn(false));

        }
    }, [token, isLoading]);

    return (
        <SafeAreaView
            style={styles.guardContainer}
            {...props}
        >
            {isLoading ? <AppLoadingSpin /> : children}
        </SafeAreaView>
    );
};

// styles ---
const styles = StyleSheet.create({
    guardContainer: {
        width: "100%",
        height: "100%",
        flex: 1,
        padding: 0,
        margin: 0,
        backgroundColor: colors.LIGHT,
        fontFamily: fonts.MONTSERRAT_REGULAR,
    },
});

export default PageGuard;

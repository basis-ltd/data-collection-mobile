import React, { useEffect } from "react";
import { fonts } from "../utils/fonts";
import { SafeAreaView } from "react-native";
import useIsUSerLoggedIn from "../hooks/useIsUSerLoggedIn";
import { colors } from "../utils/colors";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../app/login/phoneNumber.slice";
import { router } from "expo-router";
import { frontendAPI } from "../api/frontendApi";

const PageGuard = ({ children, ...props }) => {
    const { token } = useIsUSerLoggedIn();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            router.push(frontendAPI.Login);
            dispatch(setLoggedIn(false));
        }
    }, [token])

    const childrenWithProps = React.Children.map(children, child => {
        return React.isValidElement(child) ? React.cloneElement(child, { token }) : child;
    });

    return (
        <SafeAreaView
            style={styles.guardContainer}
            {...props}
        >
            {childrenWithProps}
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

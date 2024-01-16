import React from "react";
import { fonts } from "../utils/fonts";
import { SafeAreaView } from "react-native";
import useIsUSerLoggedIn from "../hooks/useUSerLoggedIn";
import { colors } from "../utils/colors";

const PageGuard = ({ children, ...props }) => {
    const { token } = useIsUSerLoggedIn();

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

import React from "react";
import { colors } from "../utils/colors";
import { Modal, SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";


const AppPopUp = (props) => {
    const { children, handleClose } = props;
    const { showPreview } = useSelector(state => state.formDataReducers);

    return (
        <Modal
            style={styles.containerPopUp}
            animationType="slide"
            // transparent={true}
            visible={showPreview}
            onRequestClose={handleClose}
        >
            <SafeAreaView style={styles.areaView}>
                {children}
            </SafeAreaView>
        </Modal>
    );
};

// styles
const styles = StyleSheet.create({
    containerPopUp: {
        backgroundColor: colors.LIGHT,
        padding: 0,
        flexDirection: "column",
        width: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    areaView: {
        padding: 20,
    }
});

export default AppPopUp;

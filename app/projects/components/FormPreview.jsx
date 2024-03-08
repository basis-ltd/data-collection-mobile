import { StyleSheet, Text, View, ScrollView } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import AppButton from '../../../components/AppButton';
import { useDispatch, useSelector } from "react-redux";
import { setShowPreview } from "./fieldDataComponents/formDataSlice";

const FormPreview = (props) => {
    const { setIsFormSubmited } = props;
    const { formValues } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()

    console.log(formValues, 'formValues');

    const handlePostData = () => {

        // hide preview after posting data to the server
        setIsFormSubmited(true); //will trigger to clear form
        hidePreview();
    }

    const hidePreview = () => {
        dispatch(setShowPreview(false))
    }

    return (
        <ScrollView
            contentContainerStyle={styles.formDataPreview}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.dataPreview}>
                <Text style={styles.titlePreview}>Entries Preview</Text>
                <Text style={styles.details}>Please do review as possible as you can before you submit your entries !!</Text>
            </View>
            <AppButton
                fullWidth={false}
                title='Submit'
                handleOnPress={handlePostData}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formDataPreview: {
        position: 'absolute',
        width: "100%",
        padding: 20,
        backgroundColor: colors.LIGHT,
        gap: 10,
        zIndex: '100',
        fontFamily: fonts.MONTSERRAT_MEDIUM,
    },

});

export default FormPreview;
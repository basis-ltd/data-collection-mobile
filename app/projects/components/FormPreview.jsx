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
        position: 'fixed',
        width: "100%",
        padding: 20,
        backgroundColor: colors.LIGHT,
        gap: 10,
    },

});

export default FormPreview;
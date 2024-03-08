import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import AppButton from '../../../components/AppButton';
import { useDispatch, useSelector } from "react-redux";
import { setShowPreview } from "./fieldDataComponents/formDataSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { assets } from "../../../utils/assets";

const FormPreview = (props) => {
    const { setIsFormSubmited } = props;
    const { formValues } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()

    const handlePostData = () => {

        // hide preview after posting data to the server
        setIsFormSubmited(true); //will trigger to clear form
        hidePreview();
    }

    const hidePreview = () => {
        dispatch(setShowPreview(false))
    }
    //structure form values
    useEffect(() => {
        console.log(formValues, 'formValues');


    }, [])


    return (
        <ScrollView
            contentContainerStyle={styles.formDataPreview}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.goBackSection}>
                <TouchableOpacity onPress={hidePreview}>
                    <Image source={assets.CloseIcon} alt="Close btn" width={25} height={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.dataPreview}>
                <Text style={styles.titlePreview}>Entries Preview</Text>
                <Text style={styles.details}>Please do review as possible as you can before you submit your entries !!</Text>
            </View>
            <View style={styles.formActions}>

                <AppButton
                    fullWidth={false}
                    title='Submit'
                    handleOnPress={handlePostData}
                />
                <AppButton
                    fullWidth={false}
                    title='Back'
                    handleOnPress={hidePreview}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formDataPreview: {
        position: 'absolute',
        width: "100%",
        padding: 20,
        backgroundColor: colors.LIGHT,
        gap: 17,
        zIndex: 100,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        minHeight: '100%'
    },
    goBackSection: {
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dataPreview: {
        gap: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    titlePreview: {
        color: colors.PRIMARY,
        fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
        fontSize: 16,
    },
    details: {
        color: colors.ACCENT_DARK,
        fontFamily: fonts.MONTSERRAT_REGULAR,
        fontSize: 13,
    },
    formActions: {
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }

});

export default FormPreview;
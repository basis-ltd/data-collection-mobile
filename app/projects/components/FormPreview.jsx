import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { colors } from "../../../utils/colors";
import { fonts } from "../../../utils/fonts";
import AppButton from '../../../components/AppButton';
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { assets } from "../../../utils/assets";
import { useEffect, useState } from "react";
import { groupArrayByKey } from "../../../helpers/groupArrayByKey";
import AppLoadingSpin from "../../../components/AppLoadingSpin";
import usePostDataFormData from "../../../hooks/userPostFormData";
import { backendAPI } from '../../../api/backendApi'
import AppError from "../../../components/AppError";
import LoadingLottie from "../../../components/LoadingLottie";

const FormPreview = (props) => {
    const { setIsFormSubmited, handleClose } = props;
    const { formValues, formId } = useSelector(state => state.formDataReducers);
    const [dataTopreview, setDataToPreview] = useState([]);
    const [loadingPreview, setLoadingpreview] = useState(true);

    const { data, error, loading, handler } = usePostDataFormData()

    const handlePostData = () => {
        //sctructure needed data
        const formData = new FormData();
        formData.append('form_id', formId);
        const fileValues = formValues.filter(fieldData => Array.isArray(fieldData.value));
        const otherValues = formValues.filter(fieldData => !Array.isArray(fieldData.value));

        //add data to from data
        otherValues?.forEach(otherValue => {
            formData.append('values', JSON.stringify({ value: otherValue.value, field_id: otherValue.field_id }));
        });


        fileValues?.forEach(fileValue => {
            // formData.append("field_id", fileValue.field_id);
            fileValue.value.forEach((file, index) => {
                formData.append(`file-${fileValue.field_id}-${index}`, {
                    uri: file.uri,
                    type: file.mimeType,
                    name: file.name,
                });
            });
        });

        fileValues?.forEach((fileValue, fieldValueIndex) => {
            const fieldIdKey = `field_${fieldValueIndex}_id`;
            formData.append(fieldIdKey, fileValue.field_id);

            fileValue.value.forEach((file, fileIndex) => {
                const fileKey = `field_${fieldValueIndex}_file_${fileIndex}`;
                formData.append(fileKey, {
                    uri: file.uri,
                    type: file.mimeType,
                    name: file.name,
                });
            });
        });

        handler(backendAPI.addFieldsData, formData)
    }

    //structure form values
    useEffect(() => {
        const timer = setTimeout(() => {
            const result = groupArrayByKey(formValues, 'sectionName');
            setDataToPreview(result);
            setLoadingpreview(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        //means we have got the result, now we can clean the form, and close Modal
        if (data && !loading && !error) {
            console.log(data, 'tests data')
            setIsFormSubmited(true); //will trigger to clear form
            handleClose();
        }
    }, [data, loading, error])


    return (
        <ScrollView
            contentContainerStyle={styles.formDataPreview}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.goBackSection}>
                <TouchableOpacity onPress={handleClose}>
                    <Image source={assets.CloseIcon} alt="Close btn" width={25} height={25} />
                </TouchableOpacity>
            </View>

            {error && !loading && <AppError message={error.message} />}
            {loading && <LoadingLottie loading={loading} />}

            <View style={styles.dataPreview}>
                <Text style={styles.titlePreview}>Entries Preview</Text>
                <Text style={styles.details}>Please do review as possible as you can before you submit your entries !!</Text>
                <View style={styles.dataWrapper}>
                    {loadingPreview && <AppLoadingSpin />}
                    {!loadingPreview && dataTopreview &&
                        dataTopreview.map((result, index) => {

                            return (
                                <View key={index} style={styles.sectionWrapper}>
                                    <Text style={styles.titleSection}>{`${result[0]?.sectionName} Section` || 'N/A'}</Text>
                                    <View style={{ width: '100%', gap: 10 }}>
                                        {result?.map((fieldData, idx) => {
                                            return (
                                                <View key={idx} style={styles.fieldDataWrapper} >
                                                    <Text style={styles.fieldLabel}>{fieldData?.label || 'N/A'}</Text>
                                                    <Text style={styles.value}>
                                                        {typeof fieldData.value === 'string' ? fieldData.value :
                                                            `${fieldData.value.length} Attached file${fieldData.value.length > 1 ? "s" : ''}`
                                                        }
                                                    </Text>
                                                </View>
                                            )
                                        })}
                                    </View>

                                </View>
                            )
                        })}

                </View>
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
                    handleOnPress={handleClose}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formDataPreview: {
        width: "100%",
        padding: 5,
        backgroundColor: colors.LIGHT,
        gap: 17,
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
    dataWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    sectionWrapper: {
        gap: 15,
        width: '100%',
    },
    titleSection: {
        color: colors.DARK,
        fontFamily: fonts.MONTSERRAT_BOLD,
        fontSize: 14,
    },
    fieldDataWrapper: {
        gap: 2,
        backgroundColor: colors.LIGHTEST_WHITE,
        padding: 5,
        borderRadius: 3,
    },
    fieldLabel: {
        color: colors.ACCENT_DARK,
        fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
        fontSize: 13,
    },
    value: {
        color: colors.SUCCESS,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
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
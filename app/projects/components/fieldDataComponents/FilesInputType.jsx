import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import { borders } from "../../../../utils/border";
import * as Yup from "yup";
import { assets } from "../../../../utils/assets";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { FormikSubmitContext } from "./SingleField";
import { useDispatch, useSelector } from "react-redux";
import { setFormErrors, setFormValues } from "./formDataSlice";
import { allowedFileTypes, maxFileSize } from "../../../../constants/allowedFileTypes";
import { isAllowedFileType } from "../../../../helpers/isAllowedTypeFile";


const FilesInputType = ({ field }) => {
    const { formSubmitRef, isFormSubmited } = useContext(FormikSubmitContext);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { formValues, formErrors } = useSelector(state => state.formDataReducers);
    const dispatch = useDispatch()

    const handleUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }

        const pickerResult = await DocumentPicker.getDocumentAsync({
            type: allowedFileTypes,
            multiple: true,
        });

        if (pickerResult.type === "cancel") {
            return;
        }



        const filteredFiles = pickerResult.assets?.filter(file => {
            const isUnderSizeLimit = file.size <= maxFileSize; // File size <= 5MB
            return isAllowedFileType(file) && isUnderSizeLimit;
        });

        setUploadedFiles((currentFiles) => [...currentFiles, ...filteredFiles]);
    };

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.array()
            .min(1, "At least one file is required")
            .required("Files are required") : Yup.array(),
    });

    const handleSubmitForm = (values) => {
        //first remove the value with these fields
        const previousValues = formValues?.filter(item => item.field_id !== field.id);
        const fieldValues = {
            field_id: field.id,
            value: values.value,
            is_required: field.is_required,
            label: field.label,
            sectionName: field.sectionName,
        }
        dispatch(setFormValues([...previousValues, fieldValues]))
    };

    const handleRemoveFile = (file) => {
        const recentlyUploadedFiles = uploadedFiles.filter(singleFile => singleFile !== file);
        setUploadedFiles(recentlyUploadedFiles);
    }

    return (
        <Formik
            initialValues={{ value: [] }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitForm}
        >
            {({ errors, resetForm, setFieldValue, handleSubmit }) => {

                //update files
                useEffect(() => {
                    setFieldValue('value', uploadedFiles);
                }, [uploadedFiles]);

                //clear form
                useEffect(() => {
                    if (isFormSubmited) {
                        resetForm();
                        setUploadedFiles([]);
                    }
                }, [isFormSubmited]);

                //watch file errors
                useEffect(() => {
                    if (errors.value) {
                        dispatch(setFormErrors([...formErrors, `error_id_:_${field.id}`]))
                    } else {
                        dispatch(setFormErrors(formErrors.filter(item => item !== `error_id_:_${field.id}`)))
                    }
                }, [errors.value]);

                return (
                    <View style={styles.formikContainer}>
                        {field.label && <Text style={styles.label}>{field.label}</Text>}
                        <Text style={styles.labelNB}>NB: Each file can not exceed 5MB of size</Text>
                        <View style={styles.introFiles}>
                            <TouchableOpacity onPress={handleUpload} style={styles.uploadBtn}>
                                <Image source={assets.FileIcon} style={{ width: 15, height: 30 }} />
                            </TouchableOpacity>
                            <Text style={styles.placeholder}>{field.placeholder || 'Upload your file'}</Text>
                        </View>
                        {uploadedFiles && uploadedFiles.length > 0 &&
                            <View style={styles.filesWrapper}>
                                <Text style={styles.titleUploaded}>Uploaded Files: </Text>
                                {uploadedFiles.map((file, index) => {
                                    return (
                                        <View style={styles.uploadedFile} key={index}>
                                            {file.name &&
                                                <Text key={index} style={styles.fileName}>
                                                    {file.name.length > 35 ? file.name.substring(0, 30) + '...' : file.name}
                                                </Text>
                                            }
                                            {!file.name && <Text key={index} style={styles.fileName}> Unknown File</Text>}
                                            <TouchableOpacity style={styles.removeFile} onPress={() => handleRemoveFile(file)}>
                                                <Image source={assets.CloseIcon} style={{ width: 24, height: 24 }} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        }
                        <Pressable
                            ref={(el) => (formSubmitRef.current[field.id] = { handleSubmit })}
                            style={styles.submitBtnInvisible}
                        >
                            <Text>Submit</Text>
                        </Pressable>
                        {errors.value && <Text style={styles.error}>{errors.value}</Text>}
                    </View>
                );
            }}
        </Formik>
    );
};

const styles = StyleSheet.create({
    formikContainer: {
        padding: 0,
        flex: 1,
        width: "100%",
        margin: 0,
        flexDirection: "column",
        gap: 11,
    },
    error: {
        color: colors.ERROR,
        fontFamily: fonts.MONTSERRAT_BOLD,
        fontSize: 12,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: -2,
    },
    label: {
        color: colors.DARK,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 14,
        backgroundColor: "transparent",
        width: "100%",
    },
    labelNB: {
        color: colors.BLUE,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 12,
        backgroundColor: "transparent",
        width: "100%",
        fontStyle: "italic"
    },
    introFiles: {
        flexDirection: 'row',
        padding: 0,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        ...borders("s", colors.ACCENT_DARK),
        borderRadius: 5,
    },
    placeholder: {
        color: colors.ACCENT_DARK,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
        fontSize: 13,
        backgroundColor: "transparent",
        width: "100%",
    },
    uploadBtn: {
        padding: 10,
        backgroundColor: 'transparent'
    },
    filesWrapper: {
        width: '100%',
        gap: 10,
        padding: 10,
        padding: 10,
        margin: 0,
        ...borders("d", colors.ACCENT_DARK),
        borderRadius: 5,
        backgroundColor: colors.LIGHT,
    },
    uploadedFile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'nowrap',
        gap: 20,
    },
    fileName: {
        color: colors.SUCCESS,
        fontSize: 13,
        fontFamily: fonts.MONTSERRAT_MEDIUM,
    },
    removeFile: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    titleUploaded: {
        color: colors.DARK,
        fontSize: 15,
        fontFamily: fonts.MONTSERRAT_BOLD,
    },
    submitBtnInvisible: {
        opacity: 0,
        width: 0,
        height: 0,
    }
});

export default FilesInputType;

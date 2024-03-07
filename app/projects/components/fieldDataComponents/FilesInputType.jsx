import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import { borders } from "../../../../utils/border";
import * as Yup from "yup";
import { assets } from "../../../../utils/assets";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';


const FilesInputType = ({ field }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }

        const pickerResult = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: true,
        });
        const newFiles = !pickerResult.canceled ? pickerResult.assets : [];

        setUploadedFiles((currentFiles) => [...currentFiles, ...newFiles]);
    };

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.array()
            .min(1, "At least one file is required")
            .required("Files are required") : Yup.array(),
    });

    // Dummy submit handler
    const handleSubmit = (values) => {
        console.log('Submitting form...', values);
    };

    // console.log('files: ', uploadedFiles)

    const handleRemoveFile = (file) => {
        const recentlyUploadedFiles = uploadedFiles.filter(singleFile => singleFile !== file);
        setUploadedFiles(recentlyUploadedFiles);
    }

    return (
        <Formik
            initialValues={{ value: [] }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, values, setFieldValue }) => {
                return (
                    <View style={styles.formikContainer}>
                        {field.label && <Text style={styles.label}>{field.label}</Text>}
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
    }
});

export default FilesInputType;
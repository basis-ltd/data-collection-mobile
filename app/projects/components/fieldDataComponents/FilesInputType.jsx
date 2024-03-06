import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../utils/colors";
import { fonts } from "../../../../utils/fonts";
import { borders } from "../../../../utils/border";
import * as Yup from "yup";
import { assets } from "../../../../utils/assets";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";


const FilesInputType = ({ field }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // Allows all media types
            allowsMultipleSelection: true, // Allow multiple selection if supported
        });

        if (pickerResult?.canceled === true) return;

        const newFiles = pickerResult.selected ? pickerResult.selected : (pickerResult.assets ? pickerResult.assets : []);
        setUploadedFiles([...uploadedFiles, ...newFiles.map(f => f.uri)]);

        newFiles.forEach(file => {
            const uri = file.uri;
            const fileType = uri.substring(uri.lastIndexOf(".") + 1);
            const formData = new FormData();
            formData.append('files', {
                uri,
                type: `application/${fileType}`,
                name: `file.${fileType}`,
            });
        });
    }; 4

    const validationSchema = Yup.object({
        value: field.is_required ? Yup.array()
            .min(1, "At least one file is required")
            .required("Files are required") : Yup.array(),
    });

    // Dummy submit handler
    const handleSubmit = (values) => {
        console.log('Submitting form...', values);
    };

    console.log('files: ', uploadedFiles)

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
                        <TouchableOpacity onPress={handleUpload}>
                            <Image source={assets.CamIcon} style={{ width: 39, height: 39 }} />
                        </TouchableOpacity>
                        {uploadedFiles && uploadedFiles.length > 0 &&
                            <View style={styles.filesWrapper}>
                                {uploadedFiles.map((file, index) => {
                                    return <Text key={index}>test file</Text>
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
    filesWrapper: {
        width: '100%',
        gap: 10,
        padding: 10,
        padding: 10,
        margin: 0,
        ...borders("s", colors.ACCENT_DARK),
        borderRadius: 5,
        backgroundColor: colors.LIGHT,
    }
});

export default FilesInputType;
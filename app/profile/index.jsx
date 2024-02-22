import { useState, useRef, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import { TouchableOpacity } from "react-native-gesture-handler";
import { assets } from "../../utils/assets";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetchData from "../../hooks/useFetchData";
import AppLoadingSpin from "../../components/AppLoadingSpin";
import { backendAPI } from "../../api/backendApi";
import useUpdateData from "../../hooks/useUpdateData";



const Profile = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [defaultUser, setDefaultUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: recentProjects, error: recentProjectsError, loading: recentProjectsLoading, handler: handleRecentProjects } = useFetchData()
  const { handler: updateHandler, error, loading, data } = useUpdateData()

  const handleUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) return;
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult?.canceled === true) return;
    const uri = pickerResult?.assets[0]?.uri;

    if (!uri) return;
    // update profile for the user
    setUploadedImage(uri);
    const fileType = uri.substring(uri.lastIndexOf(".") + 1);
    let formData = new FormData();
    formData.append('file', {
      uri,
      type: `image/${fileType}`,
      name: `image.${fileType}`,
    });

    updateHandler(backendAPI.updateUserProfile(defaultUser.id), formData, "formData");

  }

  const getUserinfo = async () => {
    const user = await AsyncStorage.getItem("userProfile");
    setDefaultUser(user ? JSON.parse(user) : null);
  }

  useEffect(() => {
    getUserinfo();
    handleRecentProjects(backendAPI.allProjectsList(2, 0))
  }, []);


  useEffect(() => {
    if (uploadedImage) {
      setImagePreview(uploadedImage)
    } else if (defaultUser) {
      setImagePreview(defaultUser?.image_url)
    }
  }, [defaultUser, uploadedImage]);

  // update local storage
  const handleUpdateUserInLS = async () => {
    const updatedUser = { ...defaultUser, image_url: imagePreview };
    setDefaultUser(updatedUser);
    await AsyncStorage.setItem("userProfile", JSON.stringify(updatedUser))
  }

  useEffect(() => {
    if (data && !loading) {
      handleUpdateUserInLS()
    }
  }, [data, loading])

  return (
    <PageGuard style={styles.profile}>
      <View style={styles.imagesWrapper}>
        {imagePreview && <Image source={{ uri: imagePreview }} resizeMode="cover" style={styles.preview} />}
        {!imagePreview && <Ionicons style={styles.preview} name="person" size={200} color="black" />}
        <TouchableOpacity onPress={handleUpload} style={styles.btnUpload} >
          <Image source={assets.CamIcon} style={{ width: 39, height: 39 }} />
        </TouchableOpacity>
      </View>
      {error && !loading && <Text style={styles.error}>{error || error[0]}</Text>}
      <View style={styles.intro}>
        <Text style={styles.title}>{defaultUser?.firstName} {defaultUser?.lastName}</Text>
        <Text style={styles.subTitle}>Ministry of Sport</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.box}>
          <Image source={assets.Email} style={styles.icon} />
          <View style={styles.box1}>
            <Text style={styles.boxTitle}>Email</Text>
            <Text style={styles.boxSubTitle}>{defaultUser?.email || "N/A"}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Image source={assets.PhoneCircle} style={styles.icon} />
          <View style={styles.box1}>
            <Text style={styles.boxTitle}>Phone</Text>
            <Text style={styles.boxSubTitle}>{defaultUser?.phone || "N/A"}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.box}>
          <Image source={assets.Docs} style={styles.icon} />
          <View style={styles.box1}>
            <Text style={styles.boxTitle}>Active Project</Text>
            {recentProjectsLoading && <AppLoadingSpin />}
            {recentProjectsError && !recentProjectsLoading && <Text style={styles.error}>{recentProjectsError?.message || recentProjectsError[0]}</Text>}
            {!recentProjectsError && !recentProjectsLoading && recentProjects && recentProjects?.data &&
              <Text style={styles.boxSubTitle}>{recentProjects?.data?.rows[0]?.title || "N/A"}</Text>
            }
          </View>
          {!recentProjectsLoading && <Image source={assets.ArrowBack} style={styles.arrowBottomLink} />}
        </TouchableOpacity>
      </View>
    </PageGuard>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.LIGHT,
    padding: 24,
    gap: 10,
    alignItems: "center",
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    paddingTop: 50,
    overflowY: "auto",
  },
  imagesWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  preview: {
    width: 167,
    height: 167,
    borderRadius: 167 / 2,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    padding: 0.

  },
  btnUpload: {
    width: "100%",
    borderRadius: 25,
    padding: 0,
  },
  intro: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    marginTop: 20,
  },
  title: {
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 18,
    color: colors.PRIMARY,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 15,
    color: colors.DARK,
    textAlign: "center",
  },
  details: {
    flexDirection: "column",
    width: "90%",
    gap: 0,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  box: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_LIGHT,
    justifyContent: "flex-start",
    gap: 26,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",

  },
  box1: {
    flexDirection: "column",
    gap: 5,
    padding: 0,
    flex: 1,
  },
  boxTitle: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.DARK,
  },
  boxSubTitle: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.PRIMARY,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  arrowBottomLink: {
    width: 21,
    height: 21,
    transform: [{ rotate: '180deg' }]
  },
  error: {
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 14,
    color: colors.ERROR,
    textAlign: "center",
    width: "100%",
    alignItems: "center",
  },
});

export default Profile;

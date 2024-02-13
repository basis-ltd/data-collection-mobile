import { useState, useRef, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import { TouchableOpacity } from "react-native-gesture-handler";
import { assets } from "../../utils/assets";
import * as ImagePicker from 'expo-image-picker';


const Profile = () => {
  const [selectedImage, setSelectedImage] = useState({ localUri: "" });

  const handleUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) return;
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult?.canceled === true) return;
    setSelectedImage({ localUri: pickerResult.uri });
  }

  return (
    <PageGuard style={styles.profile}>
      <View style={styles.imagesWrapper}>
        <Image source={selectedImage.localUri ? selectedImage.localUri : assets.DemoImg} resizeMode="cover" style={styles.preview} />
        <TouchableOpacity onPress={handleUpload} style={styles.btnUpload} >
          <Image source={assets.CamIcon} style={{ width: 39, height: 39 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.intro}>
        <Text style={styles.title}>Shema Jolivet Gislain</Text>
        <Text style={styles.subTitle}>Ministry of Sport</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.box}>
          <Image source={assets.Email} style={styles.icon} />
          <View style={styles.box1}>
            <Text style={styles.boxTitle}>Email</Text>
            <Text style={styles.boxSubTitle}>shemajolivet@sport.gov.rw</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Image source={assets.PhoneCircle} style={styles.icon} />
          <View style={styles.box1}>
            <Text style={styles.boxTitle}>Phone</Text>
            <Text style={styles.boxSubTitle}>+250 786 923 090</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Image source={assets.Docs} style={styles.icon} />
          <View style={styles.box1}>
            <Text style={styles.boxTitle}>Active Project</Text>
            <Text style={styles.boxSubTitle}>Stadium survey  </Text>
          </View>
          <Image source={assets.ArrowBack} style={styles.arrowBottomLink} />
        </View>
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
  }


});

export default Profile;

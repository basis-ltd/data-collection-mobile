import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, StyleSheet, View, Text } from "react-native";
import { assets } from "../utils/assets";
import { useState } from "react";
import { fonts } from "../utils/fonts";
import { colors } from "../utils/colors";
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoggedIn } from "../app/login/phoneNumber.slice";
import { frontendAPI } from "../api/frontendApi";
import { router } from "expo-router";


const MoreBtn = (props) => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch()


  const handleMoreAction = () => {
    setShowLogout(!showLogout)
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userProfile');
    dispatch(setLoggedIn(false));
    router.push(frontendAPI.Login);
  }

  return (
    <View style={styles.btn} {...props}>
      <TouchableOpacity onPress={handleMoreAction}>
        <Image source={assets.More} style={{ width: 26, height: 26 }} />
      </TouchableOpacity>
      <View style={!showLogout ? styles.logoutBox : styles.logoutBoxShow}>
        <TouchableOpacity onPress={handleLogout} style={styles.btnWrapper}>
          <Image source={assets.Logout} style={{ width: 24, height: 24 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoutBox: {
    display: "none",
  },
  logoutBoxShow: {
    backgroundColor: colors.LIGHT,
    position: "absolute",
    bottom: -50,
    right: -5,
    width: "fit-content",
    borderColor: colors.GRAY_LIGHT,
    borderWidth: 1,
    borderRadius: 3,
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flex: 1,
    gap: 5
  },
  logoutText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 14,
    color: colors.PRIMARY,
  }
})
export default MoreBtn;

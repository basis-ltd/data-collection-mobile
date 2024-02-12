import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState(null);

  const getUserinfo = async () => {
    const user = await AsyncStorage.getItem("userProfile");
    setUserProfile(JSON.parse(user));
  }

  useEffect(() => {
    getUserinfo()
  }, [])

  console.log(userProfile, "test userProfile")

  return (
    <PageGuard style={styles.containerHome}>
      <Text> home</Text>

      {userProfile &&
        <View style={styles.userIntroBox}>
          {userProfile.image_url ?
            <Image style={styles.iconImage} source={userProfile.image_url} alt="User Profile" /> :
            <Ionicons name="person" size={40} color="black" />
          }
          <View style={styles.userWrapper}>
            <Text style={styles.userName}>{userProfile.firstName}</Text>
            <Text style={styles.welcome}>Welcome Back</Text>
          </View>
        </View>
      }
    </PageGuard>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.LIGHT,
    padding: 24,
    gap: 10,
    alignItems: "center",
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.PRIMARY,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userIntroBox: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",

  },
  userWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  userName: {
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 16,
    color: colors.GRAY,
  },
  welcome: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 20,
    color: colors.PRIMARY,

  }
});

export default HomeScreen;

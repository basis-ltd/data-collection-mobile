import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { frontendAPI } from "../../api/frontendApi";
import ProjectCard from "../../components/ProjectCard"
import useFetchData from "../../hooks/useFetchData";
import { backendAPI } from "../../api/backendApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoadingSpin from "../../components/AppLoadingSpin";


const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigation = useNavigation()
  const { data, error, loading, handler } = useFetchData()
  const { data: dataDayEntries, error: errorDayEntries, loading: loadingDayEntries, handler: handlerDayEntries } = useFetchData()
  const { data: dataMonthEntries, error: errorMonthEntries, loading: loadingMonthEntries, handler: handlerMonthEntries } = useFetchData()
  const { data: dataWeekEntries, error: errorWeekEntries, loading: loadingWeekEntries, handler: handlerWeekEntries } = useFetchData()
  const { data: recentProjects, error: recentProjectsError, loading: recentProjectsLoading, handler: handleRecentProjects } = useFetchData()


  const getUserinfo = async () => {
    const user = await AsyncStorage.getItem("userProfile");
    setUserProfile(JSON.parse(user))
  }

  useEffect(() => {
    getUserinfo();
    handler(backendAPI.allProjectsCount);
  }, []);

  useEffect(() => {
    if (userProfile) {
      handlerDayEntries(backendAPI.entries(userProfile.id, "day"));
      handlerMonthEntries(backendAPI.entries(userProfile.id, "month"));
      handlerWeekEntries(backendAPI.entries(userProfile.id, "week"));
      handleRecentProjects(backendAPI.allProjectsList(10, 0))

    }
  }, [userProfile]);

  const handleRedirectToProjects = () => {
    navigation.navigate(frontendAPI.Projects)
  }

  return (
    <PageGuard style={styles.containerHome}>
      {userProfile &&
        <View style={styles.userIntroBox}>
          <View style={styles.iconImage}>
            {userProfile.image_url ?
              <Image
                style={styles.icon}
                source={{ uri: userProfile.image_url }}
                accessibilityLabel="User Profile"
                alt="User Profile"
              /> :
              <Ionicons style={styles.icon} name="person" size={40} color="black" />
            }
          </View>
          <View style={styles.userWrapper}>
            <Text style={styles.userName}> Hello {userProfile.firstName}</Text>
            <Text style={styles.welcome}>Welcome Back</Text>
          </View>
        </View>
      }
      <Text style={styles.title}>Your Project’s stats</Text>
      <View style={styles.statusWrapper}>

        <View style={styles.statBox}>
          <Text style={styles.statText}>Active Projects</Text>
          {data && <Text style={styles.statNumber}>{data.data}</Text>}
          {!data && error && <Text style={styles.error}>{error?.message || error[0]}</Text>}
          {loading && <AppLoadingSpin />}
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>Monthly Entries</Text>
          {dataMonthEntries && <Text style={styles.statNumber}>{dataMonthEntries?.data}</Text>}
          {!dataMonthEntries && errorMonthEntries && <Text style={styles.error}>{errorMonthEntries?.message || errorMonthEntries[0]}</Text>}
          {loadingMonthEntries && <AppLoadingSpin />}
        </View>
      </View>
      <View style={styles.statusWrapper}>
        <View style={styles.statBox}>
          <Text style={styles.statText}>Weekly Entries</Text>
          {dataWeekEntries && <Text style={styles.statNumber}>{dataWeekEntries?.data}</Text>}
          {!dataWeekEntries && errorWeekEntries && <Text style={styles.error}>{errorWeekEntries?.message || errorWeekEntries[0]}</Text>}
          {loadingWeekEntries && <AppLoadingSpin />}
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statText}>Today’s Entries</Text>
          {dataDayEntries && <Text style={styles.statNumber}>{dataDayEntries?.data}</Text>}
          {!dataDayEntries && errorDayEntries && <Text style={styles.error}>{errorDayEntries?.message || errorDayEntries[0]}</Text>}
          {loadingDayEntries && <AppLoadingSpin />}
        </View>
      </View>
      {/* recent projects */}
      <View style={styles.recentWrapper}>
        <Text style={styles.recentTitle}>Recent Assigned Project</Text>
        <Pressable className="p-0 m-0 cursor-pointer" onPress={handleRedirectToProjects}>
          <Text style={styles.resendCodeText}>See all</Text>
        </Pressable>
      </View>
      {recentProjectsLoading && <AppLoadingSpin />}
      {recentProjectsError && !recentProjectsLoading && <Text style={styles.error}>{recentProjectsError?.message || recentProjectsError[0]}</Text>}
      {!recentProjectsLoading && recentProjects && <ProjectCard project={recentProjects?.data[0]} />}
    </PageGuard>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.LIGHT,
    padding: 30,
    paddingTop: 100,
    gap: 10,
    alignItems: "center",
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    flexDirection: "column",
    gap: 17,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  icon: {
    width: "90%",
    height: "90%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  userIntroBox: {
    flexDirection: "row",
    gap: 13,
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

  },
  title: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 16,
    color: colors.DARK,
    textAlign: "left",
    width: "100%",
  },
  statusWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    justifyContent: "center",
  },
  statBox: {
    flex: 1,
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 10,
    padding: 10,
    backgroundColor: colors.PRIMARY_LIGHT,
    minHeight: 100,
  },
  statNumber: {
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 25,
    color: colors.DARK,
    textAlign: "center",
    width: "100%",
    alignItems: "center",
  },
  error: {
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 14,
    color: colors.ERROR,
    textAlign: "center",
    width: "100%",
    alignItems: "center",
  },
  statText: {
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 13,
    color: colors.PRIMARY,
    textAlign: "center",
    width: "100%",
    alignItems: "center",
  },
  recentWrapper: {
    padding: 0,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "space-between",
    width: "100%",
    marginTop: 10,
  },
  recentTitle: {
    color: colors.DARK,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 17,
    backgroundColor: colors.TRANSPARENT,
    textAlign: "left",
    alignItems: "flex-start",
    flex: 1,
  },
  resendCodeText: {
    color: colors.PRIMARY,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 16,
    textAlign: "right",
    backgroundColor: colors.TRANSPARENT,
  }
});

export default HomeScreen;

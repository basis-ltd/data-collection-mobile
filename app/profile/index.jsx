import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import PageGuard from "../../components/Guards";


const Profile = () => {

  return (
    <PageGuard style={styles.profile}>
      <Text>profile</Text>
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
  },
});

export default Profile;

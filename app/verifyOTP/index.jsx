import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import { assets } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { Formik } from "formik";
import { phoneNumberValidationSchema } from "../../validations/phoneValidationSchema";
import OTPInput from "../../components/OTPInput";

const verifyOTP = () => {
  const handleLoginSubmit = (values) => {
    console.log(values, "test values");
  };

  const demoOTPLength = 5;
  const getSingleOtpChange = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.labelVerify}>Please Enter OTP we’ve sent you</Text>
      <Formik
        initialValues={{ phone: "" }}
        validationSchema={phoneNumberValidationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ handleSubmit, errors, values, handleChange }) => {
          return (
            <View style={styles.formikContainer}>
              <View style={styles.optBox}>
                {[...new Array(demoOTPLength)].map((value, index) => {
                  <OTPInput key={index} onChange={getSingleOtpChange} />;
                })}
              </View>
              <AppButton
                fullWidth={true}
                title="Send OTP"
                handleOnPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.LIGHT,
    padding: 24,
    gap: 18,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    color: colors.PRIMARY,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontWeight: "bold",
  },
  labelVerify: {
    width: "100%",
    color: colors.ACCENT_DARK,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 17,
    marginTop: 29,
    alignItems: "flex-start",
    textAlign: "left",
  },
  formikContainer: {
    padding: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    margin: 0,
    flexDirection: "column",
    gap: 21,
  },
  optBox: {
    width: "100%",
    gap: 10,
    flexWrap: "nowrap",
  },
});

export default verifyOTP;

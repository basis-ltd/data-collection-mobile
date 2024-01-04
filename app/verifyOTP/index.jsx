import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable } from "react-native";
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

  const getSingleOtpChange = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.labelVerify}>Please Enter OTP we’ve sent you</Text>
      </View>
      <Formik
        initialValues={{ phone: "" }}
        validationSchema={phoneNumberValidationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ handleSubmit, errors, values, handleChange }) => {
          return (
            <View style={styles.formikContainer}>
              <View style={styles.optBox} className="p-0 flex m-0 w-full">
                {[1, 2, 3, 4, 5].map((value, index) => (
                  <OTPInput key={index} />
                ))}
              </View>
              {/* <Text style={styles.error}>errors with resend</Text> */}
              <View
                style={styles.resendCodeBox}
                className="p-0 m-0 w-full flex"
              >
                <Pressable className="p-0 m-0 cursor-pointer">
                  <Text style={styles.resendCodeText}>Resend Code</Text>
                </Pressable>
              </View>
              <AppButton
                fullWidth={true}
                title="Confirm"
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
    gap: 10,
    alignItems: "center",
  },
  titleBox: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 28,
    color: colors.PRIMARY,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
  },
  labelVerify: {
    width: "100%",
    color: colors.ACCENT_DARK,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    fontSize: 15,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    flexWrap: "nowrap",
    height: 44,
    marginTop: 35,
  },
  resendCodeBox: {
    marginBottom: 5,
    alignItems: "flex-end",
  },
  resendCodeText: {
    color: colors.ACCENT_DARK,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 17,
    textAlign: "right",
    backgroundColor: colors.TRANSPARENT,
  },
  error: {
    marginTop: -15,
    color: colors.ERROR,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default verifyOTP;

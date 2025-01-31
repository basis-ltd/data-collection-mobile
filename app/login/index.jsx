import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Image, View, Text } from "react-native";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import { assets } from "../../utils/assets";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { Formik } from "formik";
import { phoneNumberValidationSchema } from "../../validations/phoneValidationSchema";
import { router } from "expo-router";
import { frontendAPI } from "../../api/frontendApi";
import { setPhone } from "./phoneNumber.slice";
import { useDispatch } from "react-redux";
import usePostData from "../../hooks/usePostData";
import { backendAPI } from "../../api/backendApi";
import AppError from "../../components/AppError";
import LoadingLottie from "../../components/LoadingLottie";

const Login = () => {
  const dispatch = useDispatch()
  const { data, error, loading, handler } = usePostData()

  const handleLoginSubmit = (values) => {
    handler(backendAPI.login, values);
    dispatch(setPhone(values.phone));
  };

  useEffect(() => {

    if (!loading && data) {
      router.push(frontendAPI.verifyOTP);
    }
  }, [data, error, loading]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingLottie />}
      <Image
        source={assets.LoginPageImage}
        style={styles.loginImage}
        alt="Login SVG"
      />
      <View style={styles.titleBox}>
        <Image
          source={assets.CirclesLoginSVG}
          style={styles.titleCircleImage}
          alt="Login SVG"
        />
        <Text style={styles.title}>Data Collection App</Text>
      </View>
      <Text style={styles.labelLogin}>Login, to Start Collecting data</Text>
      {error && !loading && <AppError message={error} />}
      {/* Form login and validation */}
      <Formik
        initialValues={{ phone: "" }}
        validationSchema={phoneNumberValidationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ handleSubmit, errors, values, handleChange }) => {
          return (
            <View style={styles.formikContainer}>
              <AppInput
                iconUrl={assets.PhoneIcon}
                placeholder="Your telephone"
                keyboardType="number-pad"
                error={errors.phone}
                value={values.phone}
                onChangeText={handleChange("phone")}
              />
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
  loginImage: {
    width: "66.41221374045802%",
    aspectRatio: 261 / 262,
    height: "auto",
    marginTop: 50,
  },
  titleBox: {
    display: "flex",
    width: "100%",
    gap: 9,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  titleCircleImage: {
    width: 40,
    aspectRatio: 1 / 1,
    height: "auto",
  },
  title: {
    fontSize: 24,
    color: colors.PRIMARY,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontWeight: "bold",
  },
  labelLogin: {
    width: "100%",
    color: colors.ACCENT_DARK,
    fontFamily: fonts.MONTSERRAT_SEMI_BOLD,
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
    gap: 10,
  },
});

export default Login;

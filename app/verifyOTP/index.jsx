import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable } from "react-native";
import AppButton from "../../components/AppButton";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import OTPInput from "../../components/OTPInput";
import { useDispatch, useSelector } from "react-redux";
import usePostData from "../../hooks/usePostData";
import { backendAPI } from "../../api/backendApi";
import AppError from "../../components/AppError";
import LoadingLottie from "../../components/LoadingLottie";
import { setLoggedIn } from "../login/phoneNumber.slice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { frontendAPI } from "../../api/frontendApi";


const verifyOTP = () => {
  const optArray = new Array(5).fill("");
  const optRef = useRef(null)
  const [activeOptInput, setActiveOptInput] = useState(0);
  const [otpBoxes, setOtpBoxes] = useState([...optArray]);
  const phoneNumber = useSelector(state => state.authReducer.phone);
  const { data, error, loading, handler } = usePostData()
  const dispatch = useDispatch()

  // back to login if there is not number
  useEffect(() => {
    if (!phoneNumber) {
      router.push(frontendAPI.Login)
    }

  }, []);


  const handleSubmit = () => {
    const otp = otpBoxes.join("");
    const data = { phone: phoneNumber, otp, }
    handler(backendAPI.verifyOTP, data)
  };

  const handleChange = (value, index) => {
    const newOTP = [...otpBoxes];

    if (value === "" && newOTP[index]) {
      //move to the previous opt
      if (index !== 0) setActiveOptInput(index - 1)
      newOTP[index] = "";

    } else {
      //move to the next opt
      setActiveOptInput(index + 1)
      newOTP[index] = value;
    }
    setOtpBoxes([...newOTP])
  };

  const handlePasteOtp = (text, index) => {
    const newInputs = [...otpBoxes];
    const numberOfInputs = 5;
    let pastedText = text.split('').slice(0, numberOfInputs);
    for (let i = index; i < numberOfInputs; i++) {
      newInputs[i] = pastedText.shift() || '';
    }
    setOtpBoxes([...newInputs])
    setActiveOptInput(Math.min(index + text.length, numberOfInputs));
  }

  useEffect(() => {
    optRef.current?.focus();
  }, [activeOptInput])

  // handle save token on login confirmed
  useEffect(() => {
    const saveToken = async () => {
      try {
        await AsyncStorage.setItem('accessToken', data?.data?.token);
        await AsyncStorage.setItem('userProfile', JSON.stringify(data?.data));
      } catch (error) {
        console.error('Failed to save data to AsyncStorage:', error);
      }
    }

    if (!loading && data) {
      saveToken()
      dispatch(setLoggedIn(true));
      router.push(frontendAPI.appContainerNavigator)
    }

  }, [data, loading])

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingLottie />}
      <View style={styles.titleBox}>
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.labelVerify}>Please Enter OTP we’ve sent you on {phoneNumber}</Text>
      </View>
      {error && !loading && <AppError message={error} />}
      <View style={styles.formikContainer}>
        <View style={styles.optBox} className="p-0 flex m-0 w-full">
          {optArray.map((_, index) => (
            <OTPInput
              key={index}
              index={index}
              ref={activeOptInput === index ? optRef : null}
              keyboardType="numeric"
              onChangeText={(value) => value.length > 1 ? handlePasteOtp(value, index) : handleChange(value, index)}
              value={otpBoxes[index] || ""}
            />
          ))}
        </View>
        <View
          style={styles.resendCodeBox}
          className="p-0 m-0 w-full flex"
        >
          <Pressable className="p-0 m-0 cursor-pointer">
            <Text style={styles.resendCodeText}>Resend Code</Text>
          </Pressable>
        </View>
        <AppButton
          disabled={otpBoxes.join("").length < 5 ? true : false}
          fullWidth={true}
          title="Confirm"
          handleOnPress={handleSubmit}
        />
      </View>
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

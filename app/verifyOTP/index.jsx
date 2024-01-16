import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, Keyboard } from "react-native";
import AppButton from "../../components/AppButton";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import OTPInput from "../../components/OTPInput";
import { useSelector } from "react-redux";


const verifyOTP = () => {
  const optArray = new Array(5).fill("");
  const optRef = useRef(null)
  const [activeOptInput, setActiveOptInput] = useState(0);
  const [otpBoxes, setOtpBoxes] = useState([...optArray]);
  const phoneNumber = useSelector(state => state.authReducer.phone);
  const handleSubmit = () => {
    const otp = otpBoxes.join("");
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
    console.log(text, "text pasted")
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


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.labelVerify}>Please Enter OTP we’ve sent you on {phoneNumber}</Text>
      </View>
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

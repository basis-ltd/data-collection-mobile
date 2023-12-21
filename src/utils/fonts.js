// fonts configurations and wait untill load
import * as Font from "expo-font";

export async function loadAppFonts() {
  //this must go intop app, and we load app only when it is loaded
  await Font.loadAsync({
    "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
}

const MONTSERRAT_BLACK = "Montserrat-Black";
const MONTSERRAT_LIGHT = "Montserrat-Light";
const MONTSERRAT_BOLD = "Montserrat-Bold";
const MONTSERRAT_SEMI_BOLD = "Montserrat-SemiBold";
const MONTSERRAT_THIN = "Montserrat-Thin";
const MONTSERRAT_REGULAR = "Montserrat-Regular";
const MONTSERRAT_MEDIUM = "Montserrat-Medium";
const MONTSERRAT_EXTRA_BOLD = "Montserrat-ExtraBold";

export const fonts = {
  MONTSERRAT_BLACK,
  MONTSERRAT_LIGHT,
  MONTSERRAT_BOLD,
  MONTSERRAT_SEMI_BOLD,
  MONTSERRAT_THIN,
  MONTSERRAT_REGULAR,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_EXTRA_BOLD,
};

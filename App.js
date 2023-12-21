import { StatusBar } from "expo-status-bar";
import { Image, View, StyleSheet } from "react-native";
import InputButton from "./src/components/InputButton";
import { assets } from "./src/utils/assets";
import { colors } from "./src/utils/colors";

export default function App() {
  return (
    <View
      className="flex-1 items-center justify-center h-screen"
      style={styles.appContainer}
    >
      <Image source={assets.RSALogoWhite} width={60} height={30} />
      <InputButton
        title="Next"
        onPress={(e) => {
          e.preventDefault();
          alert("Next");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    padding: 0,
  },
});

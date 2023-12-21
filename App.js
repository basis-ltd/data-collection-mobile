import { View, StyleSheet } from "react-native";
import Login from "./src/screens/Login";

export default function App() {
  return (
    <View
      className="flex-1 items-center justify-center h-screen"
      style={styles.appContainer}
    >
      <Login />
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

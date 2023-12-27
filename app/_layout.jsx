import { Stack } from "expo-router";
import { frontendAPI } from "../api/frontendApi";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen name="login/index" options={{ headerTitle: "Login" }} />
    </Stack>
  );
};

export default AppLayout;

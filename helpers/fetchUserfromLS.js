



export const fetchToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    return token ? token : null;
}
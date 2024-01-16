import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const isTokenValid = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log(decoded, "decoded")
        return decoded.exp > currentTime
    } catch (error) {
        return false;
    }
};

const useIsUSerLoggedIn = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const tokenLS = await AsyncStorage.getItem('accessToken');
            if (tokenLS && isTokenValid(tokenLS)) {
                setToken(tokenLS)
            } else {
                setToken(null);
            }
        };
        checkToken();
    }, []);

    return { token }

}

export default useIsUSerLoggedIn;
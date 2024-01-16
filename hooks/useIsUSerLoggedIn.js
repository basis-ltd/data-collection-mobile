import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

// const isTokenValid = (token) => {
//     try {
//         const decoded = jwtDecode(token);
//         const currentTime = Date.now() / 1000;
//         console.log(decoded, "decoded")
//         return decoded.exp > currentTime
//     } catch (error) {
//         return false;
//     }
// };

const useIsUSerLoggedIn = () => {
    const [token, setToken] = useState(null);

    const checkToken = async () => {
        const tokenLS = await AsyncStorage.getItem('accessToken');
        // isTokenValid(tokenLS)
        if (tokenLS) {
            setToken(tokenLS)
        } else {
            setToken(null);
        }
    };
    checkToken();

    return { token }

}

export default useIsUSerLoggedIn;
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';

const useIsUserLoggedIn = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const tokenLS = await AsyncStorage.getItem('accessToken');
            if (tokenLS) {
                const decodedToken = jwtDecode(tokenLS);
                const isTokenExpired = decodedToken.exp * 1000 < Date.now();
                if (isTokenExpired) {
                    await AsyncStorage.removeItem('accessToken');
                    setToken(null);
                } else {
                    setToken(tokenLS);
                }
            } else {
                setToken(null);
            }
            setIsLoading(false);
        };

        checkToken();
    }, []);

    return { token, isLoading };
}

export default useIsUserLoggedIn

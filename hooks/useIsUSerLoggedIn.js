import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useIsUserLoggedIn = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const tokenLS = await AsyncStorage.getItem('accessToken');
            setToken(tokenLS ? tokenLS : null);
            setIsLoading(false);
        };

        checkToken();
    }, []);

    return { token, isLoading };
}

export default useIsUserLoggedIn

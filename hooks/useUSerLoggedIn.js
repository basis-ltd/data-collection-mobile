import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { setLoggedIn } from '../app/login/phoneNumber.slice';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import { frontendAPI } from '../api/frontendApi';



const isTokenValid = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime ? decoded : false;
    } catch (error) {
        return false;
    }
};

const useIsUSerLoggedIn = () => {
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) router.push(frontendAPI.Login);

            const decodedUser = isTokenValid(token);
            if (decodedUser) {
                console.log(decodedUser, "use logged in")
                setToken(decodedUser)
                dispatch(setLoggedIn(true));
            } else {
                router.push(frontendAPI.Login);
            }
        };

        checkToken();
    }, []);

    return { token }

}

export default useIsUSerLoggedIn;
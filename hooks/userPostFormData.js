import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePostDataFormData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handler = async (url, data) => {
        setLoading(true);
        setError(null);
        setData(null);
        const token = await AsyncStorage.getItem("accessToken");
        const axiosConfig = token ? {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        } : {};

        try {
            const response = await axios.post(url, data, axiosConfig);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err, "error")
            setError(err?.message);
            setLoading(false);
        }
    };

    return { data, error, loading, handler };

}

export default usePostDataFormData;
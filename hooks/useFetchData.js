import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handler = async (url) => {
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
            const response = await axios.get(url, axiosConfig);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { data, error, loading, handler };

}

export default useFetchData;
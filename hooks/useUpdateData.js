import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUpdateData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handler = async (url, dataToUpdate, type = null) => {
        setLoading(true);
        setError(null);
        setData(null);
        const token = await AsyncStorage.getItem("accessToken");
        const axiosConfig = {

            headers: {
                Authorization: token ? `Bearer ${token}` : null,
                'Content-Type': type !== null ? 'multipart/form-data' : "application/json",
            },
        };

        try {
            const response = await axios.patch(url, dataToUpdate, axiosConfig);
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

export default useUpdateData;

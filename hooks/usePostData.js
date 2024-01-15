import { useState } from 'react';
import axios from 'axios';

const usePostData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handler = async (url, data) => {
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const response = await axios.post(url, data);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { data, error, loading, handler };

}

export default usePostData;
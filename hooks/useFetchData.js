import { useState } from 'react';
import axios from 'axios';

const useFetchData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handler = async (url) => {
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const response = await axios.get(url);
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
import { useState, useEffect } from "react";

function useFetch(serviceFn) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        serviceFn()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { loading, error, data };
}

export default useFetch;
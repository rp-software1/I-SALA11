import { useState, useEffect } from "react";

function useFetch(fetchFn) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchFn()
            .then((result) => {
                setData(result);
                setError(null);
            })
            .catch((err) => {
                setError(err.message || "Error al cargar datos");
            })
            .finally(() => {
                setLoading(false);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, error, data };
}

export default useFetch;

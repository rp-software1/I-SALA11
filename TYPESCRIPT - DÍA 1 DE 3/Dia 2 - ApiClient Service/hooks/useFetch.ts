import { useState, useEffect } from 'react';
import type { ApiResponse } from '../types';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(
    fetcher: () => Promise<ApiResponse<T>>
): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const res = await fetcher();
                if (!cancelled) { setData(res.data); setError(null); }
            } catch (err) {
                if (!cancelled) setError((err as Error).message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    return { data, loading, error };
}
import type { ApiResponse } from '../types';

class ApiClient {
    private baseUrl = '';
    private token: string | null = null;

    setToken(token: string): void {
        this.token = token;
    }

    private getHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        };
    }

    private buildUrl(path: string, params?: Record<string, string>): string {
        const url = new URL(`${this.baseUrl}${path}`, window.location.href);
        if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
        return url.toString();
    }

    async get<T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
        const res = await fetch(this.buildUrl(path, params), { headers: this.getHeaders() });
        return res.json() as Promise<ApiResponse<T>>;
    }

    async post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        return res.json() as Promise<ApiResponse<T>>;
    }

    async patch<T>(path: string, body: Partial<T>): Promise<ApiResponse<T>> {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        return res.json() as Promise<ApiResponse<T>>;
    }

    async delete(path: string): Promise<ApiResponse<void>> {
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return res.json() as Promise<ApiResponse<void>>;
    }
}

export const apiClient = new ApiClient();
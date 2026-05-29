export type NetworkError = {
    type: 'network';
    message: string;
    status: number;
};

export type AuthError = {
    type: 'auth';
    message: string;
    redirect: string;
};

export type AppError = NetworkError | AuthError;

export function isAuthError(error: AppError): error is AuthError {
    return error.type === 'auth';
}

export function isNetworkError(error: AppError): error is NetworkError {
    return error.type === 'network';
}
import { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const onRequest = async (config: InternalAxiosRequestConfig) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
};

const onRequestError = (error: AxiosError) => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
    if (response.data.status === false) {
        return Promise.reject(response.data);
    }
    return response;
};

const onResponseError = (error: AxiosError) => {
    if (error.response?.status === 401) {
        // clear user local storage data
    }
    return Promise.reject(error.response?.data || error.message);
};


export const setupInterceptorsTo = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
};

export const convertToFormData = <T extends Record<string, string | number | boolean | object>>(data: T): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            } else {
                formData.append(key, value);
            }
        }
    });

    return formData;
};

export const convertToQueryParams = <T extends object>(params: T) => {
    const keyValuePairs = [];
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key as keyof T];
            if (value !== undefined && value !== null && value !== '') {
                keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(String(value)));
            }
        }
    }
    return keyValuePairs.join('&');
};

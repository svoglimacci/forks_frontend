import Axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://localhost:1291",
});

// Global token storage
let authToken: string | null = null;

// Function to update the auth token
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// Add request interceptor to include auth token
AXIOS_INSTANCE.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export const useCustomFetch = <T>(): ((
  config: AxiosRequestConfig,
) => Promise<AxiosResponse<T>>) => {
  // Return the same function reference always
  return AXIOS_INSTANCE;
};

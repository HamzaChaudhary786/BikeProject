import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../constants';
import { AuthSuccessResponse, GenericData } from '../interfaces';
import { setLogOut } from '../store/reducers';
import { store } from '../store/store';

const instance = axios.create({
  baseURL: API_ENDPOINT,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@access-token');
    if (token) {
      config.headers['access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.data.Msg === 'jwt expired' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post<GenericData<AuthSuccessResponse>>(`${API_ENDPOINT}/auth/login/refresh-token`, {
          refreshToken: localStorage.getItem('@refresh-token'),
        });

        // if token API returns new token
        if (refreshResponse.status === 200) {
          // save new token to localStorage
          localStorage.setItem('@access-token', refreshResponse.data.data.accessToken);
          localStorage.setItem('@refresh-token', refreshResponse.data.data.refreshToken);

          // update authorization header with new token
          originalRequest.headers['access-token'] = refreshResponse.data.data.accessToken;

          // retry original request with new token
          return instance(originalRequest);
        } else {
          // token API failed to return new token
          store.dispatch(setLogOut());
          throw new Error('Failed to refresh token');
        }
      } catch (error) {
        store.dispatch(setLogOut());
        // token API call failed
        throw new Error('Failed to refresh token');
      }
    }

    if (error.response.data.Msg === 'invalid token') {
      store.dispatch(setLogOut());
    }

    // for any other error, throw it
    return Promise.reject(error);
  },
);

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await instance(config);

    return response.data;
  } catch (error) {
    const errorObj: any = error;
    throw new Error(errorObj.response?.data.message || errorObj.response?.data.error || 'Something went wrong');
  }
};

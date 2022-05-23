import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import router from '@/router';
import store from '@/store';

const { cookies } = useCookies();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

export const setAuthHeaders = () => {
  const auth_token = cookies.get('access_token') || '';
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${auth_token}`;
};

setAuthHeaders();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.request;

    if (status === 401) {
      store.dispatch('auth/setUserUnlogin');
      setTimeout(() => {
        router.push({
          name: 'service.login',
        });
      });
    }

    return Promise.reject(error.response);
  },
);

export default axiosInstance;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let headers = {};

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://storebhai.com',
  headers,
});

axiosInstance.interceptors.request.use(
  async config => {
    const creds = await AsyncStorage.getItem('@creds');
    if (creds) {
      const fireBaseUid = JSON.parse(creds).fireBaseUid;
      config.headers.authorization = fireBaseUid;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

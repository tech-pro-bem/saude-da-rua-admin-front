import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://36b32v1d09.execute-api.sa-east-1.amazonaws.com/',
});

export default axiosInstance;

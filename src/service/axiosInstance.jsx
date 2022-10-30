import axios from 'axios';
import { getSessionStorage } from '../utils/sessionStorage';
import { UNAUTHENTICATED_ROUTES, BASE_URL } from '../constants/constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((req) => {
  const token = getSessionStorage('token');

  const isUnauthenticatedRoute = UNAUTHENTICATED_ROUTES.includes(req.url);

  if (isUnauthenticatedRoute) {
    return req;
  }

  if (token) {
    const { headers } = req
    req.headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
    return req;
  }

  return console.log('token não informado no sessionStorage');
});

export default axiosInstance;

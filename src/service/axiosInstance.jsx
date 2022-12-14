import axios from 'axios';
import { getSessionStorage } from '../utils/sessionStorage';
import UNAUTHENTICATED_ROUTES from '../data/unauthenticatedRoutes';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((req) => {
  const token = getSessionStorage('token');

  const isUnauthenticatedRoute = UNAUTHENTICATED_ROUTES.includes(req.url);

  if (isUnauthenticatedRoute) {
    return req;
  }

  if (token) {
    const { headers } = req;
    req.headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
    return req;
  }

  throw new Error('missing token in sessionStorage');
});

export default axiosInstance;

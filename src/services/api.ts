import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

/**
 * Create a brand new instance of 'axios' to handle requests to 'mirage'
 */
const http: AxiosInstance = axios.create({
  baseURL: 'https://fuerza.test',
});

/**
 * Set default headers
 */
http.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Retrieve and add access token to all requests calls
 *
 * ===========================================================================
 * (assuming the server requires the token in a header called "authorization")
 * ===========================================================================
 */
http.interceptors.request.use((config: AxiosRequestConfig) => {
  try {
    const authStorage = localStorage.getItem('FORZA::auth');
    const token = authStorage && JSON.parse(authStorage)?.token;

    if (token) {
      config.headers!.authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log('Unable to retrieve token from storage', 'error');
  }

  return config;
});

/**
 * Expose response data to service client
 */
http.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },
  (error: AxiosError) => {
    const { response, request }: { response?: AxiosResponse; request?: XMLHttpRequest } = error;
    if (response) {
      if (response.status >= 400 && response.status < 500) {
        console.log(response.data?.data?.message, 'error');
        return null;
      }
    } else if (request) {
      console.log('Request failed. Please try again.', 'error');
      return null;
    }
    return Promise.reject(error);
  },
);

export default http;

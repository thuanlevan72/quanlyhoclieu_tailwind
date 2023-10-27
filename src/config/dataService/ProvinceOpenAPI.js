import axios from 'axios';

const API_ENDPOINT = `https://provinces.open-api.vn/api/`;

const client = axios.create({
  baseURL: API_ENDPOINT,
});

class ProvinceOpenAPI {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);
const getCities = async () => {
  const res = await ProvinceOpenAPI.get('?depth=1');
  return res;
};
const getDistricts = async (code) => {
  const res = await ProvinceOpenAPI.get(`p/${code}?depth=2`);
  return res;
};
const getCommune = async (code) => {
  const res = await ProvinceOpenAPI.get(`d/${code}?depth=2`);
  return res;
};
export { ProvinceOpenAPI, getCities, getDistricts, getCommune };

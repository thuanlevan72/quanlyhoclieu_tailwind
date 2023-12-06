import axios from 'axios';

const API_ENDPOINT = 'https://img.vietqr.io/image/mbbank-0329615098-compact2.jpg';

const client = axios.create({
  baseURL: API_ENDPOINT,
});

class QRCodeAPI {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
    });
  }
}

client.interceptors.request.use((config) => {
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers };

  // Thực hiện bất kỳ thay đổi nào trước khi gửi yêu cầu
  // Ví dụ: Thêm token vào header yêu cầu

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // Xử lý lỗi 500 ở đây
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);

const generateQRCode = async (amount, addInfo, accountName) => {
  const res = await QRCodeAPI.get(
    `?amount=${amount}&addInfo=${addInfo}&accountName=${encodeURIComponent(accountName)}`,
  );
  return res;
};

export default { QRCodeAPI, generateQRCode };

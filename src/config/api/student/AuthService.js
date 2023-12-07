import { DataService } from '../../dataService/dataService';

export const AuthService = {
  forgotPassword: ({ email }) => {
    const url = `/Account/Forgot-Password`;
    const data = {
      email,
    };
    return DataService.post(url, data);
  },
  resetPassword: (newPassword, comfirmNewPassword) => {
    console.log(newPassword);
    console.log(comfirmNewPassword);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (!token) {
        throw new Error('Không tìm thấy token trong URL');
      }
      const url = `/Account/reset-Password`;
      const data = {
        Token: token,
        Password: newPassword,
        ConfirmPassword: comfirmNewPassword,
      };
      return DataService.post(url, data);
    } catch (e) {
      alert(e);
    }
  },
};

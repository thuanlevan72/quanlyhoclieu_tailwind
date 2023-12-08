import Cookies from 'js-cookie';
import actions from './actions';
// import * as layoutActions from '../themeLayout/actions'; // Sử dụng tên không gian tên "layoutActions" cho thư viện từ '../themeLayout/actions';

import { DataService } from '../../config/dataService/dataService';
import { StudentApi } from '../../config/api/student/StudentApi';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;
// const { changeMenuSuccess } = layoutActions;

const login = (values, callback) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      // console.log(values);
      const response = await DataService.post('/Account/signIn', { email: values.username, password: values.password });
      if (response.data.token == null) {
        throw new Error('đăng nhập thất bại');
      }
      Cookies.set('access_token', response.data.token);
      Cookies.set('logedIn', true);
      Cookies.set('decentralization', response.data.decentralization.toLowerCase());
      localStorage.setItem('authInfo', JSON.stringify(response.data));
      dispatch(
        loginSuccess({
          isLogin: true,
          decentralization: response.data.decentralization.toLowerCase(),
          authInfo: response.data,
        }),
      );
      // if (response.data.decentralization.toLowerCase() === 'admin') {
      //   console.clear();
      // }
      // console.log(response.data.decentralization.toLowerCase());
      // if (response.data.decentralization.toLowerCase() === 'student') {
      //   dispatch(changeMenuSuccess(true));
      // }
      callback(response.data.decentralization.toLowerCase());
      // if (values.email === 'thuanlevan72@gmail.com' && values.password === '@Anh123anh') {
      //   Cookies.set('access_token', 'response.data.data.token');
      //   Cookies.set('logedIn', true);
      //   dispatch(loginSuccess(true));
      //   callback();
      // } else {
      //   dispatch(loginErr('liên hệ với thuận lê để có thể vào được administrator'));
      // }
      // console.log(values);

      // const response = await DataService.post('/login', values);
      // if (response.data.errors) {
      //   dispatch(loginErr(response.data.errors));
      // } else {
      //   Cookies.set('access_token', response.data.data.token);
      //   Cookies.set('logedIn', true);
      //   dispatch(loginSuccess(true));
      // callback();
      // }
    } catch (error) {
      console.log(error);
      dispatch(loginErr(`Error:   ${error}`));
    }
  };
};

const register = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/Account/signUp', {
        email: values.email,
        fullName: values.name,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      console.log(response);
      if (response.data.succeed) {
        callback();
      } else {
        dispatch(loginSuccess(false));
      }
    } catch (err) {
      dispatch(loginErr(`Error:`));
    }
  };
};

const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('logedIn');
      Cookies.remove('access_token');
      Cookies.remove('decentralization');
      localStorage.removeItem('authInfo');
      localStorage.removeItem('feelist');
      localStorage.removeItem('subtotal');
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

const forgotPassword = async (values) => {
  const response = await StudentApi.forgotPassword(values);
  console.log(response);
};

export { login, logOut, register, forgotPassword };

import { DataService } from '../../dataService/dataService';

export const StudentApi = {
  changePassword: ({ password, newPassword, confirmPassword }) => {
    const url = `/Account/changePassword`;
    const data = {
      password,
      newPassword,
      confirmPassword,
    };
    return DataService.put(url, data);
  },
  getLecture: ({ pageSize, pageNumber }) => {
    const url = `/Lecture/forStudent?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getCourse: ({ pageSize, pageNumber }) => {
    const url = `/Course?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getBoughtCourse: ({ pageSize, pageNumber }) => {
    const url = `/Course/forStudent?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  forgotPassword: ({ email, verifyCode, password, confirmPassword }) => {
    const url = `/Account/ForgetPassword?model1.email=${email}&model1.verifyCode=${verifyCode}&model2.password=${password}&model2.confirmPassword=${confirmPassword}`;
    return DataService.post(url);
  },
  getFee: ({ pageSize, pageNumber }) => {
    const url = `/Fee/forStudent?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
};

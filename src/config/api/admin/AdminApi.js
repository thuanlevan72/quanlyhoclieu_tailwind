import { DataService } from '../../dataService/dataService';

export const AdminApi = {
  getStudent: ({ pageSize, pageNumber }) => {
    const url = `/Student?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getStudentByID: (id) => {
    const url = `/Student/${id}`;
    return DataService.get(url);
  },
  getCourseByStudentID: ({ pageSize, pageNumber, id }) => {
    const url = `/Course/getByStudentID?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${id}`;
    return DataService.get(url);
  },
  getTutor: ({ pageSize, pageNumber }) => {
    const url = `/Tutor?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getEnrolment: ({ pageSize, pageNumber }) => {
    const url = `/Enrollment?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getStatusType: ({ pageSize, pageNumber }) => {
    const url = `/StatusType?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  addMoney: ({ id, amount }) => {
    const url = `/Student/addMoney/${id}?amount=${amount}`;
    return DataService.post(url);
  },
  getRevenue: () => {
    const url = `/Statistical/revenue`;
    return DataService.get(url);
  },
  getCoursePercentage: () => {
    const url = `/Statistical/course/percentage`;
    return DataService.get(url);
  },
};

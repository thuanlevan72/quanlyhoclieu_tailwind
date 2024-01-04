import { DataService } from '../../dataService/dataService';

export const TutorApi = {
  getCourse: ({ pageSize, pageNumber }) => {
    const url = `/Course?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getAssignment: ({ pageSize, pageNumber }) => {
    const url = `/TutorAssignment/forTutor?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getCourseById: (id) => {
    const url = `/Course/${id}`;
    return DataService.get(url);
  },
  getEnrolment: ({ pageSize, pageNumber }) => {
    const url = `/Enrollment?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getStudent: ({ pageSize, pageNumber }) => {
    const url = `/Student?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getStatusType: ({ pageSize, pageNumber }) => {
    const url = `/StatusType?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
};

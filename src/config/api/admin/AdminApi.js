import { DataService } from '../../dataService/dataService';

export const AdminApi = {
  getStudent: ({ pageSize, pageNumber }) => {
    const url = `/Student?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getCourse: ({ pageSize, pageNumber }) => {
    const url = `/Course?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getAvailableAccount: ({ pageSize, pageNumber }, id) => {
    const url = `/Account/getAvailable?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${id}`;
    return DataService.get(url);
  },
  getStudentByID: (id) => {
    const url = `/Student/${id}`;
    return DataService.get(url);
  },
  getTutorAssignmentByTutorID: ({ pageSize, pageNumber, id }) => {
    const url = `/TutorAssignment/tutor/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  getTutorByID: (id) => {
    const url = `/Tutor/${id}`;
    return DataService.get(url);
  },
  getCourseByStudentID: ({ pageSize, pageNumber, id }) => {
    const url = `/Course/getByStudentID?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${id}`;
    return DataService.get(url);
  },
  getUnassign: ({ pageSize, pageNumber, id }) => {
    const url = `/Course/getUnassign?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${id}`;
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
  getFee: ({ pageSize, pageNumber }) => {
    const url = `/Fee?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  addStudent: (values) => {
    const url = `/Student`;
    return DataService.post(url, {
      accountId: values.accountId,
      fullName: values.fullname,
      contactNumber: values.contactNumber,
      provinceID: values.provinceID,
      districtID: values.districtID,
      communeID: values.communeID,
      email: values.email,
    });
  },
  addTutor: (values) => {
    const url = `/Tutor`;
    return DataService.post(url, {
      accountId: values.accountId,
      fullName: values.fullname,
      contactNumber: values.contactNumber,
      provinceID: values.provinceID,
      districtID: values.districtID,
      communeID: values.communeID,
      email: values.email,
    });
  },
  addTutorAssignment: (value) => {
    const url = `/TutorAssignment`;
    return DataService.post(url, {
      tutorID: value.tutorID,
      courseID: value.courseID,
      assignmentDate: value.date,
    });
  },
};

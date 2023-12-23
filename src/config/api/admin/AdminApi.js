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
  deleteStudent: (id) => {
    const url = `/Student/d/${id}`;
    return DataService.post(url);
  },
  deleteTutor: (id) => {
    const url = `/Tutor/d/${id}`;
    return DataService.post(url);
  },
  addCourse: (values) => {
    const url = `Course`;
    return DataService.post(url, {
      CourseName: values.courseName,
      CourseDescription: values.courseDescription,
      tutorID: values.tutorID,
      Cost: values.cost,
    });
  },
  getCourseById: (id) => {
    const url = `/Course/${id}`;
    return DataService.get(url);
  },
  getCoursePartbyCourseID: ({ pageSize, pageNumber, id }) => {
    const url = `/CoursePart/byCourseID?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${id}`;
    return DataService.get(url);
  },
  getCourseDetailbyCourseID: ({ pageSize, pageNumber, id }) => {
    const url = `/Course/getDetailbyCourseID?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${id}`;
    return DataService.get(url);
  },
  addCoursePart: (values) => {
    const url = `CoursePart`;
    return DataService.post(url, {
      courseID: values.courseID,
      index: values.index,
      partTitle: values.partTitle,
      amout: values.amount,
      duration: values.duration,
    });
  },
  addLecture: (values) => {
    const url = `Lecture`;
    return DataService.post(url, {
      coursePartID: values.coursePartID,
      index: values.index,
      lectureTitle: values.lectureTitle,
      lectureLink: values.lectureLink,
      duration: values.duration,
    });
  },
  deleteCoursePart: (id) => {
    const url = `CoursePart/${id}`;
    return DataService.post(url);
  },
  deleteCourse: (id) => {
    const url = `Course/${id}`;
    return DataService.post(url);
  },
  deleteLecture: (id) => {
    const url = `Lecture/${id}`;
    return DataService.post(url);
  },
  getAccount: ({ pageSize, pageNumber }) => {
    const url = `/Account?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
  changeStatusAccount: (id) => {
    const url = `/Account/Ban/${id}`;
    return DataService.post(url);
  },
  getPaymentHistoryByStudentID: ({ pageSize, pageNumber, id }) => {
    const url = `/PaymentHistory/std/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    return DataService.get(url);
  },
};

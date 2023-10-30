import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import Dashboard from './DashboardRoutes';
import withStudentLayout from '../../layout/studentLayout/withStudentLayout';
import CheckOut from '../../container/ecommerce/overview/CheckoutWizard';

const Profile = lazy(() => import('../../container/profile/settings/overview/Profile'));
const Account = lazy(() => import('../../container/profile/settings/overview/Account'));
const Password = lazy(() => import('../../container/profile/settings/overview/Passwoard'));
const SocialProfiles = lazy(() => import('../../container/profile/settings/overview/SocialProfile'));
const Notification = lazy(() => import('../../container/profile/settings/overview/Notification'));
const NotFound = lazy(() => import('../../container/pages/404'));
const StudentFee = lazy(() => import('../../page/student/StudentFee'));
const Course = lazy(() => import('../../page/student/Course'));
const CourseDetails = lazy(() => import('../../container/course/CourseDetails'));
const LectureDetails = lazy(() => import('../../container/courseWave/LectureDetails'));
const Lecture = lazy(() => import('../../page/student/Lecture'));
const PaymentHistory = lazy(() => import('../../page/student/StudentPaymentHistory'));
const Totalmoney = lazy(() => import('../../page/student/TotalMoney'));
const Settings = lazy(() => import('../../page/student/StudentProfile'));
const ComingSoon = lazy(() => import('../../container/pages/ComingSoon'));
const CalenDar = lazy(() => import('../../container/calendar/Calendar'));
const FAQ = lazy(() => import('../../container/pages/Faq'));
const CourseWave = lazy(() => import('../../page/student/CourseWave'));
const Student = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin flex items-center justify-center bg-white dark:bg-dark h-screen w-full fixed z-[999] ltr:left-0 rtl:right-0 top-0">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<Dashboard />} />
        <Route path="student-fee" element={<StudentFee />} />
        <Route path="student-fee/checkout" element={<CheckOut />} />
        <Route path="course" element={<Course />} />
        <Route path="course/courseDetails/:id" element={<CourseDetails />} />
        <Route path="courseWave/lectures" element={<CourseWave type="Lecture" />} />
        <Route path="courseWave/lectures/lecturesCard/:id" element={<Lecture />} />
        <Route path="courseWave/lectures/lecturesCard/:preid/lectureNumber/:id" element={<LectureDetails />} />
        <Route path="courseWave/materials" element={<CourseWave type="Material" />} />
        <Route path="courseWave/submissions" element={<CourseWave type="Submission" />} />
        <Route path="courseWave/assignments" element={<CourseWave type="Assignment" />} />
        <Route path="profile" element={<Settings />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="password" element={<Password />} />
          <Route path="social" element={<SocialProfiles />} />
          <Route path="notification" element={<Notification />} />
        </Route>
        <Route path="settings" element={<ComingSoon />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="total-money" element={<Totalmoney />} />
        <Route path="activity" element={<CalenDar />} />
        <Route path="help" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withStudentLayout(Student);

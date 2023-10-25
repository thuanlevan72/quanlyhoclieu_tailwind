import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import Dashboard from './DashboardRoutes';
import withStudentLayout from '../../layout/studentLayout/withStudentLayout';

const NotFound = lazy(() => import('../../container/pages/404'));
const StudentAssignment = lazy(() => import('../../page/student/StudentAssignment'));
const StudentFee = lazy(() => import('../../page/student/StudentFee'));
const Course = lazy(() => import('../../page/student/Course'));
const PaymentHistory = lazy(() => import('../../page/student/StudentPaymentHistory'));
const Profile = lazy(() => import('../../page/student/StudentProfile'));
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
        {/* <Route index path="/*" element={<StudentDashboard />} /> */}
        <Route index path="/*" element={<Dashboard />} />
        <Route path="student-assignment" element={<StudentAssignment />} />
        <Route path="student-fee" element={<StudentFee />} />
        <Route path="course" element={<Course />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withStudentLayout(Student);

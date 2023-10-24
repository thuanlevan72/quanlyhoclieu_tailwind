import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const DemoTen = lazy(() => import('../../container/dashboard/DemoTen'));
const StudentDashboard = lazy(() => import('../../page/student/StudentDashboard'));
const NotFound = lazy(() => import('../../container/pages/404'));

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DemoTen />} />
      <Route path="student-dashboard" element={<StudentDashboard />} />
      <Route path="*" element={<NotFound url="/student" />} />
    </Routes>
  );
}

export default DashboardRoutes;

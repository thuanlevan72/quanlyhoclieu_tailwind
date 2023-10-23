import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

const NotFound = lazy(() => import('../../container/pages/404'));
// const StudentDashboard = lazy(() => import('../../page/student/StudentDashboard'));
const Tutor = React.memo(() => {
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
        <Route index path="/*" element={<h1>Tutor</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default Tutor;

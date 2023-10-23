import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const DemoTen = lazy(() => import('../../container/dashboard/DemoTen'));
const NotFound = lazy(() => import('../../container/pages/404'));

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DemoTen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoutes;

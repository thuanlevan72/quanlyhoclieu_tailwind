import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';

const FeeTable = lazy(() => import('../../container/ecommerce/overview/FeeTable'));

function StudentFee() {
  const PageRoutes = [
    {
      path: '/student',
      breadcrumbName: 'Home',
    },
    {
      path: '',
      breadcrumbName: 'Fee',
    },
  ];

  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Fees"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <Routes>
        <Route index element={<FeeTable />} />
      </Routes>
    </>
  );
}

export default StudentFee;

import React, { lazy, Suspense } from 'react';
import { Row, Col, Spin } from 'antd';
import { Routes, Route, NavLink } from 'react-router-dom';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilBriefcaseAlt from '@iconscout/react-unicons/icons/uil-briefcase-alt';
import { PageHeader } from '../../../components/page-headers/page-headers';

const CourseInfo = lazy(() => import('./courseInfo'));
const CourseParts = lazy(() => import('./courseParts'));
const AddingCourse = lazy(() => import('./AddingCourse'));

function AddCourse() {
  return (
    <>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-6 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        ghost
        title="Add Course"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={15}>
          <Col xs={24}>
            <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] rounded-10 relative mb-[25px] h-full">
              <div className="px-[25px] border-b border-normal dark:border-white10 text-dark dark:text-white87 font-medium text-[17px] flex flex-wrap items-center justify-between  sm:flex-col sm:h-auto sm:mb-[15px]">
                <div className="card-nav">
                  <ul className="flex items-center flex-wrap gap-y-[8px] gap-x-[10px] mb-0">
                    <li>
                      <NavLink
                        className="relative py-[24px] px-[4px] text-[14px] font-medium text-theme-gray dark:text-white60 inline-flex items-center gap-[10px] [&.active]:text-primary [&.active>svg]:text-primary after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out after:opacity-0 after:visibility-hidden [&.active]:after:opacity-100 [&.active]:after:visibility-visible"
                        to="./course-info"
                      >
                        <UilUser className="w-[16px] h-[16px] text-light dark:text-white60" />
                        Course Info
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="relative py-[24px] px-[4px] text-[14px] font-medium text-theme-gray dark:text-white60 inline-flex items-center gap-[10px] [&.active]:text-primary [&.active>svg]:text-primary after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary after:transition-all after:duration-300 after:ease-in-out after:opacity-0 after:visibility-hidden [&.active]:after:opacity-100 [&.active]:after:visibility-visible"
                        to="./course-parts"
                      >
                        <UilBriefcaseAlt className="w-[16px] h-[16px] text-light dark:text-white60" />
                        Course Parts
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-[25px]">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="spin">
                        <Spin />
                      </div>
                    </div>
                  }
                >
                  <Routes>
                    <Route path="course-info" element={<CourseInfo />} />
                    <Route path="course-parts" element={<CourseParts />} />
                    <Route path="course-adding" element={<AddingCourse />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddCourse;

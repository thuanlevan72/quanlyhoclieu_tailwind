import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import courseData from '../../demoData/course.json';
import CourseCard from '../../components/cards/CourseCard';
import { PaginationStyle } from '../../container/styled';
import { AdminApi } from '../../config/api/admin/AdminApi';
import { Button } from '../../components/buttons/buttons';

const PageRoutes = [
  {
    path: 'student',
    breadcrumbName: 'Home',
  },
  {
    path: 'manage',
    breadcrumbName: 'Manage',
  },
  {
    path: 'course',
    breadcrumbName: 'Course',
  },
];
function Course() {
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setPagination({
          pageNumber: 1,
          pageSize: 10,
        });
        const res = await AdminApi.getCourse(pagination);
        setCourses(res.data.data);
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);

  // const onShowSizeChange = (current, pageSize) => {
  //   setState({ ...state, current, pageSize });
  // };

  // const onHandleChange = (current, pageSize) => {
  //   setState({ ...state, current, pageSize });
  // };
  return (
    <>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Course Manage"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25} className="mt-sm-10">
          <Col xs={24} className="mb-[20px]">
            <Button className="flex items-center text-[15px] rounded-[23px] bg-[#ffa502] border-[#ffa502] text-white h-[40px] hover:scale-105 transition-transform duration-300 transform">
              <Link to="/admin/manage/course/add-course/course-info" className="flex items-center">
                <UilPlus />
                <div className="font-bold">Add Course</div>
              </Link>
            </Button>
          </Col>
          {courses.map((value, index) => (
            <CourseCard key={index} courseData={value} />
          ))}
          <Col xs={24} className="mt-[30px]">
            <>
              {courseData.length ? (
                <PaginationStyle>
                  <div className="ant-pagination-custom-style text-end">
                    <Pagination
                      // onChange={onHandleChange}
                      showSizeChanger
                      // onShowSizeChange={onShowSizeChange}
                      pageSize={10}
                      defaultCurrent={1}
                      total={courseData.length}
                    />
                  </div>
                </PaginationStyle>
              ) : null}
            </>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Course;

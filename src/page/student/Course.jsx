import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import courseData from '../../demoData/course.json';
import CourseCard from '../../components/cards/CourseCard';
import { PaginationStyle } from '../../container/styled';
import { StudentApi } from '../../config/api/student/StudentApi';

const PageRoutes = [
  {
    path: 'student',
    breadcrumbName: 'Home',
  },
  {
    path: 'course',
    breadcrumbName: 'Courses',
  },
];
function Course() {
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 8,
  });
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setPagination({
          pageNumber: 1,
          pageSize: 8,
        });
        const res = await StudentApi.getCourse(pagination);
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
        title="Course"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25} className="mt-sm-10">
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

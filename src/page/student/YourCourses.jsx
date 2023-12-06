import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import CourseWaveCard from '../../components/cards/CourseWaveCard';
import { PaginationStyle } from '../../container/styled';
import { StudentApi } from '../../config/api/student/StudentApi';

function YourCourses() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Home',
    },
    {
      path: 'yourCourse',
      breadcrumbName: 'Your Courses',
    },
  ];
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 8,
  });
  const [coursesWave, setCoursesWave] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setPagination({
          pageNumber: 1,
          pageSize: 8,
        });
        const res = await StudentApi.getBoughtCourse(pagination);
        setCoursesWave(res.data.data);
      } catch (error) {
        setCoursesWave([]);
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
        title="Your Courses"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25} className="mt-sm-10">
          {coursesWave.length ? (
            coursesWave.map((value, index) => <CourseWaveCard key={index} courseWaveData={value} />)
          ) : (
            <div className="text-center w-[100%] text-[30px]">Empty</div>
          )}

          <Col xs={24} className="mt-[40px]">
            <>
              {coursesWave.length ? (
                <PaginationStyle>
                  <div className="ant-pagination-custom-style text-end">
                    <Pagination
                      // onChange={onHandleChange}
                      showSizeChanger
                      // onShowSizeChange={onShowSizeChange}
                      pageSize={10}
                      defaultCurrent={1}
                      total={coursesWave.length}
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

export default YourCourses;

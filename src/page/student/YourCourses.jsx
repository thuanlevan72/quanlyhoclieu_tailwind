import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import courseWaveData from '../../demoData/courseWave.json';
import CourseWaveCard from '../../components/cards/CourseWaveCard';
import { PaginationStyle } from '../../container/styled';

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
  const [state, setState] = useState({
    coursesWave: courseWaveData,
    current: 0,
    pageSize: 0,
  });
  const { coursesWave } = state;
  useEffect(() => {
    if (courseWaveData) {
      setState({
        coursesWave: courseWaveData,
      });
    }
  }, []);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };
  return (
    <>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title=""
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25} className="mt-sm-10">
          {coursesWave.map((value, index) => (
            <CourseWaveCard key={index} courseWaveData={value} />
          ))}

          <Col xs={24} className="mt-[40px]">
            <>
              {courseWaveData.length ? (
                <PaginationStyle>
                  <div className="ant-pagination-custom-style text-end">
                    <Pagination
                      onChange={onHandleChange}
                      showSizeChanger
                      onShowSizeChange={onShowSizeChange}
                      pageSize={10}
                      defaultCurrent={1}
                      total={courseWaveData.length}
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

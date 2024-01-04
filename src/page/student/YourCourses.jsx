import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import UilSearch from '@iconscout/react-unicons/icons/uil-search';
import { PageHeader } from '../../components/page-headers/page-headers';
import CourseWaveCard from '../../components/cards/CourseWaveCard';
// import { PaginationStyle } from '../../container/styled';
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
    pageSize: 1000,
  });
  const [coursesWave, setCoursesWave] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setPagination({
          pageNumber: 1,
          pageSize: 1000,
        });
        const res = await StudentApi.getBoughtCourse(pagination);
        setCoursesWave(res.data.data.reverse());
        setData(res.data.data.reverse());
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
  const onChangeSearch = (event) => {
    if (event.target.value.length > 0) {
      const filter = coursesWave.filter((x) => x.courseName.toLowerCase().includes(event.target.value.toLowerCase()));
      setData(filter);
    } else setData(coursesWave);
  };
  return (
    <>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Your Courses"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25} className="mt-sm-10">
          <Col xs={24} className="mb-[20px]">
            <div className=" max-w-[400px] bg-white border-4 rounded-[12px]">
              <div className="px-[20px] flex items-center">
                <UilSearch />
                <input
                  placeholder="Course name"
                  className="outline-none py-[10px] ml-[10px] w-[100%]"
                  onChange={onChangeSearch}
                />
              </div>
            </div>
          </Col>
          {data.length ? (
            data.map((value, index) => <CourseWaveCard key={index} courseWaveData={value} />)
          ) : (
            <div className="text-center w-[100%] text-[30px]">Empty</div>
          )}

          {/* <Col xs={24} className="mt-[40px]">
            <>
              {coursesWave.length ? (
                <PaginationStyle>
                  <div className="ant-pagination-custom-style text-end">
                    <Pagination
                      // onChange={onHandleChange}
                      // onShowSizeChange={onShowSizeChange}
                      pageSize={8}
                      defaultCurrent={1}
                      total={coursesWave.length}
                    />
                  </div>
                </PaginationStyle>
              ) : null}
            </>
          </Col> */}
        </Row>
      </main>
    </>
  );
}

export default YourCourses;

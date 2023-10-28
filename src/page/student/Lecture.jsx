import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'antd';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import coureWaveData from '../../demoData/courseWave.json';
import lectureData from '../../demoData/lecture.json';
import LectureCard from '../../components/cards/LectureCard';
import { PaginationStyle } from '../../container/styled';

function Lecture() {
  const { id } = useParams();
  const currentCourseWave = coureWaveData.find((x) => x.id.toString() === id);
  const newLectureData = lectureData.map((value) => {
    const cloneValue = { ...value };
    cloneValue.navid = id.toString();
    return cloneValue;
  });
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Home',
    },
    {
      path: 'courseWave',
      breadcrumbName: 'CourseWave',
    },
    {
      path: 'lecture',
      breadcrumbName: 'Lecture',
    },
    {
      path: 'lectuteList',
      breadcrumbName: 'Lecture List',
    },
    {
      path: currentCourseWave.title,
      breadcrumbName: currentCourseWave.title,
    },
  ];
  const [state, setState] = useState({
    lecture: newLectureData,
    current: 0,
    pageSize: 0,
  });
  const { lecture } = state;
  useEffect(() => {
    if (lectureData) {
      setState({
        lecture: newLectureData,
      });
    }
  }, []);
  console.log(lecture);
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
        title={currentCourseWave.title}
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25} className="mt-sm-10">
          {lecture.map((value, index) => (
            <LectureCard key={index} lectureData={value} />
          ))}
          <Col xs={24}>
            <>
              {lectureData.length ? (
                <PaginationStyle>
                  <div className="ant-pagination-custom-style text-end">
                    <Pagination
                      onChange={onHandleChange}
                      showSizeChanger
                      onShowSizeChange={onShowSizeChange}
                      pageSize={10}
                      defaultCurrent={1}
                      total={lectureData.length}
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

export default Lecture;

import React from 'react';
import { Col } from 'antd';
import '../profile/myProfile/overview/video-modal.css';
import { useParams } from 'react-router-dom';
import lectureData from '../../demoData/lecture.json';
import { PageHeader } from '../../components/page-headers/page-headers';

function LectureDetails() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Home',
    },
  ];
  const { id } = useParams();
  const currentlecture = lectureData.find((x) => x.id.toString() === id);
  return (
    <Col lg={24} xs={24}>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title={currentlecture.title}
        routes={PageRoutes}
      />
      <div className="bg-white dark:bg-whiteDark p-[35px] rounded-[10px]">
        <div className="mb-6">
          <iframe
            height="500"
            src={currentlecture.link}
            title="YouTube video player"
            className="w-1/2 rounded-[10px] mx-auto"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Col>
  );
}

export default LectureDetails;

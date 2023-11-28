import React, { useState, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Collapse, Skeleton } from 'antd';

import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilPlay from '@iconscout/react-unicons/icons/uil-play';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import courseData from '../../demoData/course.json';
import { PageHeader } from '../../components/page-headers/page-headers';
import '../profile/myProfile/overview/video-modal.css';
import { Cards } from '../../components/cards/frame/cards-frame';

const PageRoutes = [
  {
    path: 'index',
    breadcrumbName: 'Home',
  },
  {
    path: 'yourCourses',
    breadcrumbName: 'Your Courses',
  },
  {
    path: 'courseDetail',
    breadcrumbName: 'Course Detail',
  },
];
function CourseDetails() {
  const [lectures, setLectures] = useState([
    {
      id: '1',
      title: 'Getting Started',
      classes: [
        {
          id: '1',
          classTitle: 'Course Introduction',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: true,
        },
        {
          id: '2',
          classTitle: 'Demand of UI/UX Design',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '3',
          classTitle: 'Tools',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
      ],
    },
    {
      id: '2',
      title: 'User Interface Vs User Experience',
      classes: [
        {
          id: '1',
          classTitle: 'Course Introduction',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '2',
          classTitle: 'Demand of UI/UX Design',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '3',
          classTitle: 'Tools',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
      ],
    },
    {
      id: '3',
      title: 'Design Fundamental',
      classes: [
        {
          id: '1',
          classTitle: 'Course Introduction',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '2',
          classTitle: 'Demand of UI/UX Design',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '3',
          classTitle: 'Tools',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
      ],
    },
    {
      id: '4',
      title: 'Colour Theory',
      classes: [
        {
          id: '1',
          classTitle: 'Course Introduction',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '2',
          classTitle: 'Demand of UI/UX Design',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '3',
          classTitle: 'Tools',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
      ],
    },
    {
      id: '5',
      title: 'Typography',
      classes: [
        {
          id: '1',
          classTitle: 'Course Introduction',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '2',
          classTitle: 'Demand of UI/UX Design',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '3',
          classTitle: 'Tools',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
      ],
    },
    {
      id: '6',
      title: 'Live Project 01',
      classes: [
        {
          id: '1',
          classTitle: 'Course Introduction',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '2',
          classTitle: 'Demand of UI/UX Design',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '3',
          classTitle: 'Tools',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
      ],
    },
    {
      id: '7',
      title: 'Live Project 02',
      classes: [
        {
          id: '1',
          classTitle: 'Course Introduction',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '2',
          classTitle: 'Demand of UI/UX Design',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
        {
          id: '3',
          classTitle: 'Tools',
          videoLink: 'https://www.youtube.com/embed/RmY5OdmC7Ps?si=bTp--7hOIczsrRw8',
          duration: '5',
          isWatched: false,
          isAvailable: false,
        },
      ],
    },
  ]);
  const { id } = useParams();
  const [link, setLink] = useState('https://www.youtube.com/embed/dBd1j6x2HOo');

  const activeChoose = (value, li, si) => {
    const currentL = lectures[li - 1];
    if (li - 0 < lectures.length) {
      if (si - 0 < currentL.classes.length) {
        setLink(value);
        setLectures((prevLectures) => {
          const newLectures = [...prevLectures];
          newLectures[li - 1] = {
            ...newLectures[li - 1],
            classes: newLectures[li - 1].classes.map((cls, index) => {
              if (index === si - 1) {
                cls.isWatched = true;
              }
              if (index === si - 0) {
                cls.isAvailable = true;
              }
              return cls;
            }),
          };
          return newLectures;
        });
      }
      if (si - 0 === currentL.classes.length) {
        setLink(value);
        setLectures((prevLectures) => {
          const newLectures = [...prevLectures];
          newLectures[li - 1] = {
            ...newLectures[li - 1],
            classes: newLectures[li - 1].classes.map((cls, index) => {
              if (index === si - 1) {
                cls.isWatched = true;
              }
              return cls;
            }),
          };
          newLectures[li] = {
            ...newLectures[li],
            classes: newLectures[li].classes.map((cls, index) => {
              if (index === 0) {
                cls.isAvailable = true;
              }
              return cls;
            }),
          };
          return newLectures;
        });
      }
    } else {
      if (si - 0 < lectures[lectures.length - 1].classes.length) {
        setLink(value);
        setLectures((prevLectures) => {
          const newLectures = [...prevLectures];
          newLectures[li - 1] = {
            ...newLectures[li - 1],
            classes: newLectures[li - 1].classes.map((cls, index) => {
              if (index === si - 1) {
                cls.isWatched = true;
              }
              if (index === si - 0) {
                cls.isAvailable = true;
              }
              return cls;
            }),
          };
          return newLectures;
        });
      }
      setLink(value);
      setLectures((prevLectures) => {
        const newLectures = [...prevLectures];
        newLectures[li - 1] = {
          ...newLectures[li - 1],
          classes: newLectures[li - 1].classes.map((cls, index) => {
            if (index === si - 1) {
              cls.isWatched = true;
            }
            return cls;
          }),
        };
        return newLectures;
      });
    }
  };
  const currentCourse = courseData.find((x) => x.id.toString() === id);
  return (
    <Suspense
      fallback={
        <Cards headless>
          <Skeleton active />
        </Cards>
      }
    >
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Course"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col lg={18} xs={24}>
            <div className="bg-white dark:bg-whiteDark p-[35px] rounded-[10px]">
              <div className="mb-6">
                <iframe
                  height="315"
                  src={link}
                  title="YouTube video player"
                  className="w-full rounded-[10px] h-[600px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </Col>
          <Col lg={6} xs={24} className="lg:mb-[30px]">
            <div>
              <h2 className="text-3xl font-semibold text-dark dark:text-white87">{currentCourse.title}</h2>
              <div>
                <p className="text-base text-body dark:text-white60 mb-[28px]">
                  Many support queries and technical questions will already be answered in supporting documentation such
                  as and comments from previous buyers. Anim pariatur cliche reprehenderit, enim eiusmod
                </p>
              </div>

              <h2 className="text-dark dark:text-white87 mt-[30px] mb-[14px] text-[22px] font-semibold">
                Course content
              </h2>
              <div>
                <Collapse
                  className="bg-transparent [&>.ant-collapse-item]:bg-white [&>.ant-collapse-item:last-child]:bg-[#eccc68] dark:[&>.ant-collapse-item]:bg-white06 dark:[&>.ant-collapse-item:last-child]:bg-white10 [&>.ant-collapse-item]:mb-[5px] [&>.ant-collapse-item]:rounded-[5px] [&>.ant-collapse-item]:border [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-whiteDark [&>.ant-collapse-item]:shadow-[0_15px_40px_rgba_(173,181,217)] [&>.ant-collapse-item>.ant-collapse-header]:text-[15px] [&>.ant-collapse-item>.ant-collapse-header]:font-medium [&>.ant-collapse-item>.ant-collapse-header]:text-dark dark:[&>.ant-collapse-item>.ant-collapse-header]:text-white87 [&>.ant-collapse-item>.ant-collapse-header]:py-[15px] [&>.ant-collapse-item>.ant-collapse-header]:px-[25px] [&>.ant-collapse-item>.ant-collapse-header]:border-b [&>.ant-collapse-item>.ant-collapse-header]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-header]:border-white06 [&>.ant-collapse-item>.ant-collapse-content>.ant-collapse-content-box]:px-[25px] [&>.ant-collapse-item>.ant-collapse-content>.ant-collapse-content-box]:py-[20px] [&>.ant-collapse-item>.ant-collapse-content>.ant-collapse-content-box]:pb-[12px]"
                  bordered={false}
                  defaultActiveKey={['1']}
                  expandIcon={({ isActive }) =>
                    isActive ? (
                      <UilMinus className="w-[14px] h-[14px] text-light-extra dark:text-white60 ltr:mr-2 rtl:ml-2" />
                    ) : (
                      <UilPlus className="w-[14px] h-[14px] text-light-extra dark:text-white60 ltr:mr-2 rtl:ml-2" />
                    )
                  }
                >
                  {lectures.map((lecture) => (
                    <CollapsePanel
                      header={`${lecture.title}`}
                      key={lecture.id}
                      extra={
                        <div className="flex items-center gap-x-[70px] xl:gap-x-[30px] sm:gap-x-[10px] ml-2.5">
                          <span className="text-sm font-normal text-body dark:text-white60">03 Lectures</span>
                          <span className="text-sm font-normal text-body dark:text-white60">15:00</span>
                        </div>
                      }
                    >
                      <ul className="flex flex-col items-center gap-y-6">
                        {lecture.classes.map((singleClass, index) => (
                          <li className="w-full" key={index}>
                            <Link
                              className="flex items-center gap-2"
                              onClick={
                                singleClass.isAvailable
                                  ? () => activeChoose(singleClass.videoLink, lecture.id, singleClass.id)
                                  : () => {}
                              }
                              to="#"
                            >
                              <UilPlay className="w-4 h-4 text-[#eccc68]" />
                              <span
                                className={`title${lecture.id}${singleClass.id} dark:text-white60 text-[15px] 
                                
                                 ${
                                   singleClass.isWatched
                                     ? 'text-black'
                                     : singleClass.isAvailable
                                     ? 'text-[#eccc68]'
                                     : 'text-gray-400 cursor-not-allowed'
                                 } `}
                              >
                                {singleClass.classTitle}
                              </span>
                              <div className="flex items-center ml-auto gap-x-[80px] xl:gap-x-[30px] sm:gap-x-[10px]">
                                <span className="text-sm text-body dark:text-white60">5:00</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CollapsePanel>
                  ))}
                </Collapse>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </Suspense>
  );
}

export default CourseDetails;

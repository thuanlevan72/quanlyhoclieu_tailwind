import React, { useState, Suspense, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Collapse, Skeleton, message, Select, Form } from 'antd';

import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilPlay from '@iconscout/react-unicons/icons/uil-play';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import Input from 'antd/lib/input/Input';
import { UilQuestionCircle } from '@iconscout/react-unicons';
import { PageHeader } from '../../components/page-headers/page-headers';
import '../profile/myProfile/overview/video-modal.css';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Modal } from '../../components/modals/antd-modals';
import Test from '../../components/tasklist/Test';
import { AdminApi } from '../../config/api/admin/AdminApi';
import { Button } from '../../components/buttons/buttons';

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
function CourseDetailForAdmin() {
  const [lectures, setLectures] = useState([]);
  // const [pagination, setPagination] = useState({
  //   pageNumber: 1,
  //   pageSize: 100,
  // });
  const [course, setCourse] = useState({
    cost: 0,
    courseDescription: '',
    courseID: 0,
    courseName: '',
    tutorID: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        // setPagination({
        //   pageNumber: 1,
        //   pageSize: 1000,
        // });
        const res = await AdminApi.getCourseDetailbyCourseID({ pageSize: 10000, pageNumber: 1, id: parseInt(id) });
        setLectures(res.data.data);
        const res1 = await AdminApi.getCourseById(parseInt(id));
        setCourse({
          ...course,
          cost: res1.data.cost,
          courseDescription: res1.data.courseDescription,
          courseID: res1.data.courseID,
          courseName: res1.data.courseName,
          tutorID: res1.data.tutorID,
        });
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [reload, id]);
  const [link, setLink] = useState('https://www.youtube.com/embed/PBwzoZ8aFxI?si=JzLOvPTKI6wU5JVG');
  const [currentTitle, setCurrentTitle] = useState('LD Academy');
  const [visible, setVisible] = useState(false);
  lectures.forEach((data) => {
    data.classes.forEach((cdata) => {
      cdata.isWatching = false;
      cdata.isWatched = true;
      cdata.isAvailable = true;
    });
  });
  const activeChoose = (value, title, li, si) => {
    setLink(value);
    setCurrentTitle(title);
    setLectures((prevLectures) => {
      const newLectures = [...prevLectures];
      newLectures[li - 1] = {
        ...newLectures[li - 1],
        classes: newLectures[li - 1].classes.map((cls, index) => {
          if (index === si - 1) {
            cls.isWatching = true;
          }
          return cls;
        }),
      };
      return newLectures;
    });
  };
  const { Option } = Select;
  const [addCoursePart, setAddCoursePart] = useState(false);
  const [addLecture, setAddLecture] = useState(false);
  const [state, setState] = useState({
    coursePart: {
      courseID: parseInt(id),
      index: 0,
      partTitle: '',
      amout: 0,
      duration: 0,
    },
    lecture: {
      coursePartID: 0,
      index: 0,
      lectureTitle: '',
      lectureLink: '',
      duration: 15,
    },
    exam: {
      coursePartID: 0,
      examTypeID: 0,
      examName: '',
      description: '',
      workTime: 0,
      dueDate: '2023-12-19T13:13:00.937Z',
      minGrade: 0,
    },
  });
  const onHandleCoursePartChange = (event) => {
    const currentIndex = lectures.length + 1;
    setState({
      ...state,
      coursePart: {
        ...state.coursePart,
        partTitle: event.target.value,
        index: currentIndex,
      },
    });
  };

  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [currentCoursePartID, setCurrentCoursePartID] = useState(-1);
  const onhandleChangCoursePart = (value) => {
    if (value > 0) {
      setCurrentCoursePartID(value);
      const currentCoursePart = lectures.findIndex((x) => x.coursePartID === value);
      let nextIndex = 1;
      if (lectures[currentCoursePart].classes.length > 0) {
        nextIndex = lectures[currentCoursePart].classes[lectures[currentCoursePart].classes.length - 1].index;
      }
      setCurrentLectureIndex(nextIndex + 1);
    }
    return null;
  };
  const fetchCoursePart = async (value) => {
    const res = await AdminApi.addCoursePart(value);
    return res;
  };
  const onHandleCoursePartOK = () => {
    const res = fetchCoursePart(state.coursePart);
    res
      .then((result) => {
        if (result.data === 'Added') {
          message.success('Added');
          setReload((preReload) => !preReload);
        } else message.warning('Failed');
      })
      .catch(() => {
        message.warning('Failed');
      });
    setAddCoursePart(false);
  };
  const onHandleLectureChange = (event) => {
    setState({
      ...state,
      lecture: {
        ...state.lecture,
        lectureTitle: event.target.value,
        index: currentLectureIndex,
        coursePartID: currentCoursePartID,
      },
    });
  };
  const onHandleLinkChange = (event) => {
    setState({
      ...state,
      lecture: {
        ...state.lecture,
        lectureLink: event.target.value,
      },
    });
  };
  const fetchLecture = async (value) => {
    const res = await AdminApi.addLecture(value);
    return res;
  };
  const onHandleLectureOK = () => {
    const res = fetchLecture(state.lecture);
    res
      .then((result) => {
        if (result.data === 'Added') {
          message.success('Added');
          setReload((preReload) => !preReload);
        } else message.warning('Failed');
      })
      .catch(() => {
        message.warning('Failed');
      });

    setAddLecture(false);
  };
  const [deleteVisible, setDeleteVisible] = useState(false);
  const fetchDeleteCoursePart = async (value) => {
    const res = await AdminApi.deleteCoursePart(value);
    return res;
  };
  const fetchDeleteCourse = async (value) => {
    const res = await AdminApi.deleteCourse(value);
    return res;
  };
  const fetchDeleteLecture = async (value) => {
    const res = await AdminApi.deleteLecture(value);
    return res;
  };
  const [type, setType] = useState(0);
  const [deleteCoursePartIndex, setDeleleCoursePartIndex] = useState(0);
  const onHandleDelete = (event, indexType) => {
    setDeleteVisible(true);
    setType(indexType);
    const index = event.target.id;
    setDeleleCoursePartIndex(parseInt(index));
  };
  const onHandleDeleteOK = () => {
    if (type === 2) {
      const res = fetchDeleteCoursePart(deleteCoursePartIndex);
      res
        .then((result) => {
          if (result.data === 'Added') {
            message.success('Deleted');
            setReload((preReload) => !preReload);
          } else message.warning('Failed');
        })
        .catch(() => {
          message.warning('Failed');
        });
    }
    if (type === 1) {
      const res = fetchDeleteCourse(parseInt(id));
      res
        .then((result) => {
          if (result.data === 'Added') {
            message.success('Deleted');
            navigate(`/admin/manage/course/`);
          } else message.warning('Failed');
        })
        .catch(() => {
          message.warning('Failed');
        });
    }
    if (type === 3) {
      const res = fetchDeleteLecture(deleteCoursePartIndex);
      res
        .then((result) => {
          if (result.data === 'Added') {
            message.success('Deleted');
            setReload((preReload) => !preReload);
          } else message.warning('Failed');
        })
        .catch(() => {
          message.warning('Failed');
        });
    }
    setDeleteVisible(false);
  };
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
        title={course.courseName}
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Modal visible={visible} width={700} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
          <Test />
        </Modal>
        <Modal visible={addCoursePart} width={700} onCancel={() => setAddCoursePart(false)} onOk={onHandleCoursePartOK}>
          <div className="text-body text-[20px]">Course part:</div>
          <Input className="my-[20px]" placeholder="Enter course part" onChange={onHandleCoursePartChange} />
        </Modal>
        <Modal visible={addLecture} width={700} onCancel={() => setAddLecture(false)} onOk={onHandleLectureOK}>
          <div className="text-body text-[20px]">Lecture:</div>
          <Form>
            <Form.Item
              className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
              name="coursePart"
              label="Course Part"
              rules={[{ required: true, message: '*Required' }]}
            >
              <Select
                style={{ width: '100%' }}
                value={lectures}
                onChange={onhandleChangCoursePart}
                placeholder="Select course part"
              >
                <Option value={-1}>Choose course part</Option>
                {lectures.length !== 0 ? (
                  lectures &&
                  lectures.map((value) => {
                    return (
                      <Option value={value.coursePartID}>
                        {value.coursePartID}. {value.coursePartName}
                      </Option>
                    );
                  })
                ) : (
                  <Option value={0}>Add a course part</Option>
                )}
              </Select>
            </Form.Item>
          </Form>
          <div>Title: </div>
          <Input className="my-[20px]" placeholder="Enter lecture title" onChange={onHandleLectureChange} />
          <div>Link: </div>
          <Input className="my-[20px]" placeholder="Enter lecture link" onChange={onHandleLinkChange} />
        </Modal>
        <Modal visible={deleteVisible} width={700} onCancel={() => setDeleteVisible(false)} onOk={onHandleDeleteOK}>
          <div className="text-[20px] text-body">Are you sure to delete?</div>
        </Modal>
        <Row gutter={25}>
          <Col lg={18} xs={24}>
            <div className="bg-white rounded-[10px] p-[35px] mb-[30px]">
              <div className="w-[100%] text-[30px] font-bold mb-[20px]">Config</div>
              <div>
                <Row className="flex justify-between">
                  <Col lg={6} md={12}>
                    <Button
                      className="px-[20px] mx-[20px] bg-[#ffa502] text-white hover:border-[#ffa502] flex py-[20px] 
                    items-center hover:scale-105 transition-transform duration-300 transform"
                      onClick={() => setAddCoursePart(true)}
                    >
                      <UilPlus />
                      Add Course Part
                    </Button>
                  </Col>
                  <Col lg={6} md={12}>
                    <Button
                      className="px-[20px] mx-[20px] bg-[#ffa502] text-white hover:border-[#ffa502] flex py-[20px] 
                    items-center hover:scale-105 transition-transform duration-300 transform"
                      onClick={() => setAddLecture(true)}
                    >
                      <UilPlus />
                      Add Lecture
                    </Button>
                  </Col>
                  <Col lg={6} md={12}>
                    <Button
                      className="px-[20px] mx-[20px] bg-[#ffa502] text-white hover:border-[#ffa502] flex py-[20px] 
                    items-center hover:scale-105 transition-transform duration-300 transform"
                      onClick={() => message.loading('Comming soon')}
                    >
                      <UilPlus />
                      Add Exam
                    </Button>
                  </Col>
                  <Col lg={6} md={12}>
                    <Button
                      className="px-[20px] mx-[20px] bg-red-500 text-white hover:border-red-500 flex py-[20px] 
                    items-center hover:scale-105 transition-transform duration-300 transform"
                      onClick={(event) => onHandleDelete(event, 1)}
                    >
                      <UilTrashAlt />
                      Delete Course
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
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
                <div className=" mt-[30px] ">
                  <div className="text-[40px] text-body">{currentTitle}</div>
                  <div>Any questions?</div>
                </div>
                <div className="text-[20px] mt-[60px]">
                  <div>
                    Fanpage: <a href="">fanpage.fanpage.com</a>
                  </div>
                  <div>
                    Facebook: <a href="">facebook.facebook.com</a>
                  </div>
                  <div>
                    Youtube: <a href="">youtube.youtube.com</a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} xs={24} className="lg:mb-[30px]">
            <div className="">
              <h2 className="text-3xl font-semibold text-[#ffa502] dark:text-white87">{course.courseName}</h2>
              <div>
                <p className="text-base text-body dark:text-white60 mb-[28px]">{course.courseDescription}</p>
              </div>

              <h2 className="text-dark dark:text-white87 mt-[30px] mb-[14px] text-[22px] font-semibold">
                Course content
              </h2>
              <div>
                <Collapse
                  className="bg-transparent [&>.ant-collapse-item]:bg-white dark:[&>.ant-collapse-item]:bg-white06 dark:[&>.ant-collapse-item:last-child]:bg-white10 [&>.ant-collapse-item]:mb-[5px] [&>.ant-collapse-item]:rounded-[5px] [&>.ant-collapse-item]:border [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-whiteDark [&>.ant-collapse-item]:shadow-[0_15px_40px_rgba_(173,181,217)] [&>.ant-collapse-item>.ant-collapse-header]:text-[15px] [&>.ant-collapse-item>.ant-collapse-header]:font-medium [&>.ant-collapse-item>.ant-collapse-header]:text-dark dark:[&>.ant-collapse-item>.ant-collapse-header]:text-white87 [&>.ant-collapse-item>.ant-collapse-header]:py-[15px] [&>.ant-collapse-item>.ant-collapse-header]:px-[25px] [&>.ant-collapse-item>.ant-collapse-header]:border-b [&>.ant-collapse-item>.ant-collapse-header]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-header]:border-white06 [&>.ant-collapse-item>.ant-collapse-content>.ant-collapse-content-box]:px-[25px] [&>.ant-collapse-item>.ant-collapse-content>.ant-collapse-content-box]:py-[20px] [&>.ant-collapse-item>.ant-collapse-content>.ant-collapse-content-box]:pb-[12px]"
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
                  {lectures.map((lecture, index) => (
                    <CollapsePanel
                      header={`${lecture.coursePartName}`}
                      key={lecture.coursePartID}
                      extra={
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-normal text-body dark:text-white60">03 Lectures</span>
                          <span className="text-sm font-normal text-body dark:text-white60 ml-[5px]">15:00</span>
                          <span>
                            <UilTrashAlt
                              id={lecture.coursePartID}
                              className="text-body hover:text-red-500 ml-[10px] hover:scale-105 transition-transform duration-300 transform"
                              onClick={(event) => onHandleDelete(event, 2)}
                            />
                          </span>
                        </div>
                      }
                    >
                      <ul className="flex flex-col items-center gap-y-6">
                        {lecture.classes.map((singleClass, index1) => (
                          <li className="w-full" key={index}>
                            <Link
                              className="flex items-center gap-2"
                              onClick={
                                singleClass.isAvailable
                                  ? () =>
                                      activeChoose(
                                        singleClass.lectureLink,
                                        singleClass.lectureTitle,
                                        index + 1,
                                        index1 + 1,
                                      )
                                  : () => {}
                              }
                              to="#"
                            >
                              <UilPlay className="w-4 h-4 text-[#eccc68]" />
                              <span
                                className={`title${lecture.coursePartID}${
                                  singleClass.lectureID
                                } dark:text-white60 text-[15px] title hover:text-[#ffa502]
                                
                                 ${
                                   singleClass.isWatching
                                     ? 'text-[#ffa502]'
                                     : singleClass.isWatched
                                     ? 'text-black'
                                     : singleClass.isAvailable
                                     ? 'text-[#eccc68]'
                                     : 'text-gray-400 cursor-not-allowed'
                                 } `}
                              >
                                {singleClass.lectureTitle}
                              </span>
                              <div className="flex items-center ml-auto gap-x-[80px] xl:gap-x-[30px] sm:gap-x-[10px]">
                                <span className="text-sm text-body dark:text-white60">{singleClass.duration}:00</span>
                              </div>
                              <span>
                                <UilTrashAlt
                                  id={singleClass.lectureID}
                                  className="text-body hover:text-red-500 ml-[10px] hover:scale-105 transition-transform duration-300 transform"
                                  onClick={(event) => onHandleDelete(event, 3)}
                                />
                              </span>
                            </Link>
                          </li>
                        ))}
                        {lecture.exams.map((singleExam, index1) => (
                          <li className="w-full" key={index1}>
                            <Link
                              className="flex items-center gap-2 text-[#1e90ff] hover:text-[#343995fe]"
                              onClick={() => setVisible(true)}
                            >
                              <UilQuestionCircle />
                              <span className="">{singleExam.examName}</span>
                              <div className="flex items-center ml-auto gap-x-[80px] xl:gap-x-[30px] sm:gap-x-[10px]">
                                <span className="text-sm text-body dark:text-white60">{singleExam.workTime}:00</span>
                              </div>
                              <span>
                                <UilTrashAlt className="text-body hover:text-red-500 ml-[10px]" />
                              </span>
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

export default CourseDetailForAdmin;

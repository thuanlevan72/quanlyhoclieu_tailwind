import { Suspense, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Col, Form, Row, Select, Table, message } from 'antd';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import UilPhone from '@iconscout/react-unicons/icons/uil-phone';
import UilShow from '@iconscout/react-unicons/icons/uil-list-ol';
import UilPlus from '@iconscout/react-unicons/icons/uil-file-plus-alt';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash';
import { AdminApi } from '../../config/api/admin/AdminApi';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';

function TutorDetail() {
  const { Option } = Select;
  const navigate = useNavigate();
  const params = useParams([]);
  const [assignment, setAssignment] = useState([]);
  const [values, setValues] = useState({
    pageSize: 100,
    pageNumber: 1,
    id: parseInt(params.id),
  });
  const [tutor, setTutor] = useState([]);
  const [course, setCourse] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dvisible, setDVisible] = useState(false);
  const courseTableData = [];
  const courseColumns = [
    {
      title: 'Course ID',
      dataIndex: 'courseID',
      key: 'courseID',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Number of student',
      dataIndex: 'students',
      key: 'students',
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Update At',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: 'Show',
      dataIndex: 'show',
      key: 'show',
    },
  ];
  const studentColumns = [
    {
      title: 'Student ID',
      dataIndex: 'studentID',
      key: 'studentID',
    },
    {
      title: 'Student Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
  ];
  const [unassign, setUnassign] = useState([]);
  const [state, setState] = useState({
    student: [],
    enrollment: [],
  });
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setValues({
          pageSize: 100,
          pageNumber: 1,
          id: parseInt(params.id),
        });
        const res = await AdminApi.getTutorByID(parseInt(params.id));
        const res2 = await AdminApi.getTutorAssignmentByTutorID(values);
        const res3 = await AdminApi.getCourse({ pageSize: values.pageSize, pageNumber: values.pageNumber });
        const res4 = await AdminApi.getUnassign(values);
        const res5 = await AdminApi.getStudent({ pageSize: 1000000, pageNumber: 1 });
        const res6 = await AdminApi.getEnrolment({ pageSize: 1000000, pageNumber: 1 });
        setUnassign(res4.data.data);
        setTutor(res.data);
        setAssignment(res2.data.data);
        setCourse(res3.data.data);
        setState({
          student: res5.data.data,
          enrollment: res6.data.data,
        });
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, [reload]);
  const [lstStudentData, setLstStudentData] = useState([]);
  const cacheLst = [];
  const [listVisible, setListVisible] = useState(false);
  const onHandleShowList = (courseID) => {
    if (state.student.length > 0 && state.enrollment.length > 0) {
      const currentEnroll = state.enrollment.filter((x) => x.courseID === courseID);
      if (currentEnroll) {
        currentEnroll.map((data) => {
          const current = state.student.find((x) => x.studentID === data.studentID);
          return cacheLst.push({
            studentID: <span className="text-[15px] text-body">{current.studentID}</span>,
            fullName: (
              <Link
                to={`/admin/manage/student/${current.studentID}`}
                className="text-[15px] text-body hover:text-[#ffa502]"
              >
                {current.fullName}
              </Link>
            ),
          });
        });
        setLstStudentData(cacheLst);
      }
    }
    setListVisible(true);
  };
  if (assignment !== null && tutor !== null) {
    assignment.map((data) => {
      const { courseID, numberOfStudent, createAt, updateAt } = data;
      const index = course.findIndex((x) => x.courseID === data.courseID);
      if (course[index]) {
        const name = course[index].courseName;
        return courseTableData.push({
          courseID: <span className="text-[15px] text-body">{courseID}</span>,
          courseName: <span className="text-[15px] text-body">{name}</span>,
          students: <span className="text-[15px] text-body">{numberOfStudent}</span>,
          createAt: <span className="text-body dark:text-white60 text-[15px] font-medium">{createAt}</span>,
          updateAt: <span className="text-body dark:text-white60 text-[15px] font-medium">{updateAt}</span>,
          show: (
            <Button
              className="hover:text-[#ffa502] hover:border-[#ffa502]"
              onClick={() => onHandleShowList(course[index].courseID)}
            >
              <UilShow />
            </Button>
          ),
        });
      }
      return data;
    });
  }
  const [cID, setCID] = useState(0);
  const fetchDataA = async () => {
    try {
      const now = new Date();
      const aVal = {
        tutorID: parseInt(params.id),
        courseID: cID,
        date: now,
      };
      const res = await AdminApi.addTutorAssignment(aVal);
      return res;
    } catch (error) {
      message.warning('Call Failed');
    }
  };
  const onHandleOK = () => {
    const res = fetchDataA();
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
    setVisible(false);
  };
  const onHandleChange = (value) => {
    if (value !== cID) setCID(value);
  };
  const onhandleDelete = () => {
    setDVisible(true);
  };
  const fetchDS = async () => {
    try {
      const res = AdminApi.deleteTutor(parseInt(params.id));
      return res;
    } catch (error) {
      alert('hehe');
    }
  };
  const onhandleOkD = () => {
    const res = fetchDS();
    res
      .then((result) => {
        if (result.data === 'Succeed') {
          message.success('Deleted');
          navigate('/admin/manage/tutor');
        } else message.warning('Failed');
      })
      .catch(() => {
        message.warning('Failed');
      });
    setDVisible(false);
  };
  return (
    <Suspense fallback="Cho mot ti~">
      <PageHeader
        className="pt-[29px] px-[30px] pb-[31px] bg-[#f4f5f7] dark:bg-transparent flex items-start justify-between [&>div]:flex-1 [&>div]:flex [&>div]:items-center min-2xl:[&>div]:justify-between 2xl:[&>div]:flex-wrap xl:[&>div]:flex-col 2xl:[&>div]:gap-[15px] [&>div]:justify-center lg:[&>div]:flex-col [&>div>div>span+span]:mt-0 md:[&>div]:gap-[15px] lg:[&>div>div]:flex-warp lg:[&>div>div]:flex-col lg:[&>div>div]:flex-wrap lg:[&>div>div]:gap-[15px]"
        ghost
        title={
          <>
            <span className="text-[22px] font-semibold text-dark dark:text-white87 relative min-md:ltr:pr-[24px] min-md:ltr:mr-[24px] min-md:rtl:pl-[24px] min-md:rtl:ml-[24px] capitalize leading-[32px] after:absolute ltr:after:right-0 rtl:after:left-0 after:top-0 after:h-full after:w-[1px] after:content-[''] after:bg-normal dark:after:bg-white10 md:after:hidden">
              Tutor Manage
            </span>
          </>
        }
      />
      <Modal
        visible={listVisible}
        width={700}
        onCancel={() => setListVisible(false)}
        onOk={() => setListVisible(false)}
      >
        <div className="text-body mt-[40px] text-[30px]">List student:</div>
        <Table className="mb-[40px]" pagination={false} columns={studentColumns} dataSource={lstStudentData} />
      </Modal>
      <Modal visible={visible} width={700} onCancel={() => setVisible(false)} onOk={onHandleOK}>
        New Assignment
        <Form>
          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            name="course"
            label="Course"
            rules={[{ required: true, message: '*Required' }]}
          >
            <Select style={{ width: '100%' }} value={unassign} onChange={onHandleChange} placeholder="Select course">
              {unassign.length !== 0 ? (
                unassign &&
                unassign.map((value) => {
                  return (
                    <Option value={value.courseID}>
                      {value.courseID}. {value.courseName}
                    </Option>
                  );
                })
              ) : (
                <Option value={0}>Null</Option>
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal visible={dvisible} width={700} onCancel={() => setDVisible(false)} onOk={() => onhandleOkD()}>
        Are you sure to delete this tutor?
      </Modal>
      <Row gutter={25} className="flex justify-center">
        <Col xs={22} className="mb-[20px] flex justify-end">
          <Button
            className="flex items-center text-[15px] rounded-[23px] bg-red-500 border-red-500 text-white"
            onClick={onhandleDelete}
          >
            <div className="mr-[5px] font-bold">Delete</div>
            <UilTrash />
          </Button>
        </Col>
        <Col xs={20}>
          <div
            className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 
        text-[15px] rounded-10 relative mb-[25px] mx-auto"
          >
            <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
              <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                Tutor Detail
              </h1>
            </div>
            <div className="p-[25px]">
              <Row gutter="30">
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilUser />
                      <div className="px-[15px]">{tutor.fullName}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilEnvelope />
                      <div className="px-[15px]">{tutor.email}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilPhone />
                      <div className="px-[15px]">{tutor.contactNumber}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={20} className="mb-[20px] flex justify-end">
          <Button
            className="flex items-center text-[15px] rounded-[23px] bg-[#ffa502] border-[#ffa502] text-white"
            onClick={() => setVisible(true)}
          >
            <UilPlus />
            <div className="ml-[5px] font-bold">Assignment</div>
          </Button>
        </Col>
        <Col xs={20} className="mb-[60px]">
          <Table pagination={false} columns={courseColumns} dataSource={courseTableData} />
        </Col>
      </Row>
    </Suspense>
  );
}

export default TutorDetail;

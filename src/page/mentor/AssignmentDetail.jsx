import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Col, Row, Table } from 'antd';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilInfo from '@iconscout/react-unicons/icons/uil-tag';
import UilPhone from '@iconscout/react-unicons/icons/uil-clock';
import { PageHeader } from '../../components/page-headers/page-headers';
import { TutorApi } from '../../config/api/tutor/TutorApi';

function AssignmentDetail() {
  const params = useParams([]);
  const [course, setCourse] = useState([]);
  const [enrolls, setEnrolls] = useState([]);
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState([]);
  const authInfo = localStorage.getItem('authInfo');
  const authInfoObject = JSON.parse(authInfo);
  const currentID = authInfoObject.id;
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
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await TutorApi.getCourseById(parseInt(params.id));
        const res1 = await TutorApi.getEnrolment({ pageSize: 1000000, pageNumber: 1 });
        const res2 = await TutorApi.getStudent({ pageSize: 1000000, pageNumber: 1 });
        const res3 = await TutorApi.getStatusType({ pageSize: 1000000, pageNumber: 1 });
        setStatus(res3.data.data);
        setCourse(res.data);
        setEnrolls(res1.data.data);
        setStudents(res2.data.data);
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);
  const cacheLst = [];
  let count = 0;
  if (enrolls) {
    enrolls.map((data) => {
      if (data.courseID === parseInt(params.id) && data.tutorID === currentID) {
        const current = students.findIndex((x) => x.studentID === data.studentID);
        count += 1;
        if (data.statusTypeID === 1) {
          return cacheLst.push({
            studentID: <span className="text-[15px] text-body">{students[current].studentID}</span>,
            fullName: <span className="text-[15px] text-body">{students[current].fullName}</span>,
            status: (
              <span className="text-[15px] text-[#2ed573] bg-gray-100 px-[10px] py-[5px] rounded-10">
                {status[data.statusTypeID - 1].statusName}
              </span>
            ),
          });
        }
        if (data.statusTypeID === 2) {
          return cacheLst.push({
            studentID: <span className="text-[15px] text-body">{students[current].studentID}</span>,
            fullName: <span className="text-[15px] text-body">{students[current].fullName}</span>,
            status: (
              <span className="text-[15p] text-[#ffa502] bg-gray-100 px-[10px] py-[5px] rounded-10">
                {status[data.statusTypeID - 1].statusName}
              </span>
            ),
          });
        }
        return cacheLst.push({
          studentID: <span className="text-[15px] text-body">{students[current].studentID}</span>,
          fullName: <span className="text-[15px] text-body">{students[current].fullName}</span>,
          status: (
            <span className="text-[15p] text-[#ff4757] bg-gray-100 px-[10px] py-[5px] rounded-10">
              {status[data.statusTypeID - 1].statusName}
            </span>
          ),
        });
      }
      return data;
    });
  }
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
      <Row gutter={25} className="flex justify-center">
        <Col xs={20} className="mb-[80px]">
          <div
            className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 
        text-[15px] rounded-10 relative mb-[25px] mx-auto"
          >
            <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
              <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                Course Detail
              </h1>
            </div>
            <div className="p-[25px]">
              <Row gutter="30">
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilInfo />
                      <div className="px-[15px]">{course.courseName}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilUser />
                      <div className="px-[15px]">{count}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilPhone />
                      <div className="px-[15px]">{course.createAt}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={20} className="mb-[60px]">
          <Table pagination={false} columns={studentColumns} dataSource={cacheLst} />
        </Col>
      </Row>
    </Suspense>
  );
}

export default AssignmentDetail;

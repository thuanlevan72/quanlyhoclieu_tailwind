import { Suspense, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Col, Input, Row, Table, message } from 'antd';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import UilPhone from '@iconscout/react-unicons/icons/uil-phone';
import UilDoller from '@iconscout/react-unicons/icons/uil-dollar-alt';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash';
import { AdminApi } from '../../config/api/admin/AdminApi';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import Heading from '../../components/heading/heading';
import { PaginationStyle } from '../../container/styled';

function StudentDetail() {
  const params = useParams([]);
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [course, setCourse] = useState([]);
  const [values, setValues] = useState({
    pageSize: 100,
    pageNumber: 1,
    id: parseInt(params.id),
  });
  const [tutor, setTutor] = useState([]);
  const [state, setState] = useState({
    enrollment: [],
    status: [],
  });
  const [visible, setVisible] = useState(false);
  const [dvisible, setDVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const fetchDataM = async () => {
    try {
      const moneyVal = {
        id: parseInt(params.id),
        amount: inputValue,
      };
      const res = await AdminApi.addMoney(moneyVal);
      return res;
    } catch (error) {
      alert('hehe');
    }
  };
  const [reload, setReload] = useState(false);
  const onHandleOK = () => {
    const res = fetchDataM();
    res
      .then((result) => {
        if (result.data === 'Done') {
          message.success('Added');
          setReload((preReload) => !preReload);
        } else message.warning('Failed');
      })
      .catch(() => {
        message.warning('Failed');
      });
    setVisible(false);
  };
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
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  const paymentColumns = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentHistoryID',
      key: 'paymentHistoryID',
    },
    {
      title: 'Description',
      dataIndex: 'paymentName',
      key: 'paymentName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
    },
  ];
  const [pml, setPml] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setValues({
          pageSize: 100,
          pageNumber: 1,
          id: parseInt(params.id),
        });
        const res1 = await AdminApi.getStudentByID(parseInt(params.id));
        const res2 = await AdminApi.getCourseByStudentID(values);
        const tutorRes = await AdminApi.getTutor(values);
        const enrollRes = await AdminApi.getEnrolment(values);
        const statusRes = await AdminApi.getStatusType(values);
        const paymentlst = await AdminApi.getPaymentHistoryByStudentID({
          pageSize: 10000,
          pageNumber: 1,
          id: parseInt(params.id),
        });
        console.log(paymentlst.data.data);
        setPml(paymentlst.data.data);
        setState({
          enrollment: enrollRes.data.data,
          status: statusRes.data.data,
        });
        setTutor(tutorRes.data.data);
        setStudent(res1.data);
        setCourse(res2.data.data);
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, [reload]);
  const paymentTableData = [];
  if (pml) {
    pml.map((data) => {
      const { paymentHistoryID, paymentName, amount, createAt } = data;
      return paymentTableData.push({
        paymentHistoryID: <span className="text-[15px] text-body">{paymentHistoryID}</span>,
        paymentName: <span className="text-[15px] text-body">{paymentName}</span>,
        amount: <span className="text-[15px] text-body">{amount}</span>,
        createAt: <span className="text-[15px] text-body">{createAt}</span>,
      });
    });
  }
  if (course !== null && tutor !== null) {
    course.map((data) => {
      const { courseID, courseName, tutorID } = data;
      const index = tutor.findIndex((x) => x.tutorID === tutorID);
      const index2 = state.enrollment.findIndex((x) => x.courseID === courseID && x.studentID === parseInt(params.id));
      const index3 = state.status.findIndex((x) => x.statusTypeID === state.enrollment[index2].statusTypeID);
      return courseTableData.push({
        courseID: <span className="text-[15px] text-body">{courseID}</span>,
        courseName: <span className="text-[15px] text-body">{courseName}</span>,
        tutor: (
          <Link
            to={`/admin/manage/tutor/${tutor[index].tutorID}`}
            className="text-[15px] text-body hover:text-[#ffa502]"
          >
            {tutor[index].fullName}
          </Link>
        ),
        status: <span className="text-[15px] text-body">{state.status[index3].statusName}</span>,
      });
    });
  }
  const onhandleDelete = () => {
    setDVisible(true);
  };
  const fetchDS = async () => {
    try {
      const res = AdminApi.deleteStudent(parseInt(params.id));
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
          navigate('/admin/manage/student');
        } else message.warning('Failed');
      })
      .catch(() => {
        message.warning('Failed');
      });
    setDVisible(false);
  };
  const formattedCurrency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(student.totalMoney);
  return (
    <Suspense fallback="Cho mot ti~">
      <PageHeader
        className="pt-[29px] px-[30px] pb-[31px] bg-[#f4f5f7] dark:bg-transparent flex items-start justify-between [&>div]:flex-1 [&>div]:flex [&>div]:items-center min-2xl:[&>div]:justify-between 2xl:[&>div]:flex-wrap xl:[&>div]:flex-col 2xl:[&>div]:gap-[15px] [&>div]:justify-center lg:[&>div]:flex-col [&>div>div>span+span]:mt-0 md:[&>div]:gap-[15px] lg:[&>div>div]:flex-warp lg:[&>div>div]:flex-col lg:[&>div>div]:flex-wrap lg:[&>div>div]:gap-[15px]"
        ghost
        title={
          <>
            <span className="text-[22px] font-semibold text-dark dark:text-white87 relative min-md:ltr:pr-[24px] min-md:ltr:mr-[24px] min-md:rtl:pl-[24px] min-md:rtl:ml-[24px] capitalize leading-[32px] after:absolute ltr:after:right-0 rtl:after:left-0 after:top-0 after:h-full after:w-[1px] after:content-[''] after:bg-normal dark:after:bg-white10 md:after:hidden">
              Student Manage
            </span>
          </>
        }
      />
      <Modal visible={visible} width={700} onCancel={() => setVisible(false)} onOk={() => onHandleOK()}>
        <div className="py-[40px]">
          <div className="text-[20px] text-body font-bold">Amount:</div>
          <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
      </Modal>
      <Modal visible={dvisible} width={700} onCancel={() => setDVisible(false)} onOk={() => onhandleOkD()}>
        Are you sure to delete this student?
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
                Student Detail
              </h1>
            </div>
            <div className="p-[25px]">
              <Row gutter="30">
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilUser />
                      <div className="px-[15px]">{student.fullName}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilEnvelope />
                      <div className="px-[15px]">{student.email}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilPhone />
                      <div className="px-[15px]">{student.contactNumber}</div>
                    </div>
                  </div>
                </Col>
                <Col lg={12} xs={24} className="flex justify-between mb-25">
                  <div className="border rounded-4 text-light mb-[25px]">
                    <div className="px-[20px] py-[8px] flex">
                      <UilDoller />
                      <div className="px-[15px]">{formattedCurrency}</div>
                    </div>
                  </div>
                  <Button
                    className="border-light right-0 mt-[5px] text-light hover:border-[#ffa502] hover:text-white hover:bg-[#eccc68]"
                    onClick={() => setVisible(true)}
                  >
                    <div>Add Money</div>
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={20} className="mb-[60px]">
          <Heading className="text-[20px]">Enrollment</Heading>
          <Table pagination={false} columns={courseColumns} dataSource={courseTableData} />
        </Col>
        <Col xs={20} className="mb-[60px]">
          <Heading className="text-[20px]">Payment History</Heading>
          <PaginationStyle>
            <div className="ant-pagination-custom-style table-responsive table-head-rounded table-th-shape-none table-th-border-none table-last-th-text-right hover-tr-none table-td-border-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
              <Table
                className="[&>div>div>.ant-table]:mb-7 [&>div>div>.ant-table]:pb-5 [&>div>div>.ant-table]:border-b [&>div>div>.ant-table]:border-regular dark:[&>div>div>.ant-table]:border-white10 ltr:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pl-[20px] ltr:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pl-[20px] rtl:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pr-[20px] rtl:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pr-[20px] "
                dataSource={paymentTableData}
                columns={paymentColumns}
                pagination={{ pageSize: 7, showSizeChanger: true, total: pml.length }}
              />
            </div>
          </PaginationStyle>
        </Col>
      </Row>
    </Suspense>
  );
}

export default StudentDetail;

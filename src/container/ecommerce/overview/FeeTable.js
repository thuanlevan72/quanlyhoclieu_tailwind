import { Col, Row, Skeleton, Table } from 'antd';
import { useState, useEffect, Suspense } from 'react';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash';
import Ordersummary from './Ordersummary';
import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle } from '../../styled';
import { StudentApi } from '../../../config/api/student/StudentApi';

function FeeTable() {
  const productTableData = [];
  const productTableColumns = [
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '',
      dataIndex: 'remove',
      key: 'remove',
    },
  ];
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 8,
  });
  const [fee, setFee] = useState([]);
  const [enrolls, setEnrolls] = useState([]);
  const authInfo = localStorage.getItem('authInfo');
  const authInfoObject = JSON.parse(authInfo);
  useEffect(() => {
    async function fetchData() {
      try {
        const values = {
          id: authInfoObject.id,
          pageNumber: 1,
          pageSize: 100,
        };
        const res1 = await StudentApi.getEnrollment(values);
        setEnrolls(res1.data.data);
      } catch (error) {
        return 'error';
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        setPagination({
          pageNumber: 1,
          pageSize: 8,
        });
        const res = await StudentApi.getFee(pagination);
        setFee(res.data.result.data);
      } catch (error) {
        alert('Sai rồi kìa');
      }
    }
    fetchData();
  }, [enrolls]);
  const onHandleChecked = (key) => {
    setFee((prevFee) => {
      return prevFee.map((item) => {
        if (item.feeID === key) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
    });
  };
  const onHandleRemove = async (key) => {
    const index = enrolls.findIndex((x) => x.courseID === key);
    const res2 = await StudentApi.removeEnrollment(enrolls[index].enrollmentID);
    const data = fee.filter((x) => x.courseID !== key);
    setFee([...data]);
    return res2;
  };
  let subtotal = 0;
  fee.map((data) => {
    if (data.isChecked) subtotal += data.cost;
    return data;
  });
  localStorage.setItem('subtotal', subtotal);
  localStorage.setItem('feelist', JSON.stringify(fee));
  const courses = localStorage.getItem('courses');
  const coursesObject = JSON.parse(courses);
  if (fee !== null) {
    fee.map((data) => {
      const { feeID, cost, isChecked, status, courseID } = data;
      let index = -1;
      if (status === 'Not Yet') {
        coursesObject.map((value, i) => {
          if (value.courseID === courseID) {
            index = i;
            return i;
          }
          return -1;
        });
        return productTableData.push({
          course: (
            <div className="cart-single">
              <figure className="flex items-center mb-0">
                <Checkbox className="pr-2" checked={isChecked} onChange={() => onHandleChecked(feeID)} />
                <img
                  className="max-w-[80px] min-h-[80px] ltr:mr-[25px] rtl:ml-[25px] rounded-[10px]"
                  style={{ width: 80 }}
                  src={require(`../../../static/img/courses/1.png`)}
                  alt=""
                />
                <figcaption>
                  <div className="cart-single__info">
                    <Heading as="h6" className="text-base font-medium text-dark dark:text-white87">
                      {coursesObject[index].courseName}
                    </Heading>
                  </div>
                </figcaption>
              </figure>
            </div>
          ),
          price: <span className="text-body dark:text-white60 text-[15px]">{cost.toLocaleString('en-US')}VND</span>,
          date: <span className="text-body dark:text-white60 text-[15px]">28/10/2023</span>,
          remove: (
            <UilTrash
              className="text-body w-[30px] h-[30px] cursor-pointer flex justify-center items-center border-none hover:text-[#ff4757]"
              onClick={() => onHandleRemove(courseID)}
            />
          ),
        });
      }
      return null;
    });
  }
  return (
    <>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <div className="">
          <Row gutter={15}>
            <Col md={24}>
              <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                <Row gutter={30}>
                  <Col xxl={17} xs={24}>
                    <Suspense
                      fallback={
                        <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                          <Skeleton className="w-full" paragraph={{ rows: 10 }} active />
                        </div>
                      }
                    >
                      <GlobalUtilityStyle>
                        <div className="table-responsive table-th-shape-none table-th-border-none hover-tr-none table-tr-hover-shadow table-td-border-none [&>div>div>div>div>div>.ant-table-content]:pb-5 ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
                          <Table pagination={false} dataSource={productTableData} columns={productTableColumns} />
                        </div>
                      </GlobalUtilityStyle>
                    </Suspense>
                  </Col>
                  <Col xxl={7} xs={24}>
                    <Suspense
                      fallback={
                        <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                          <Skeleton paragraph={{ rows: 10 }} active />
                        </div>
                      }
                    >
                      <Ordersummary subtotal={subtotal} checkout={false} />
                    </Suspense>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}
export default FeeTable;

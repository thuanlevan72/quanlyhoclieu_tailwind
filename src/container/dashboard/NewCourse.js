import CountUp from 'react-countup';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { GlobalUtilityStyle, TableDefaultStyle } from '../styled';
import { AdminApi } from '../../config/api/admin/AdminApi';

const productColumns = [
  {
    title: 'Course Name',
    dataIndex: 'cName',
    key: 'cName',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden  ltr:rounded-l-4 rtl:rounded-r-4',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden ltr:rounded-r-4 rtl:rounded-l-4',
  },
];

const NewCourse = React.memo(() => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const pagination = {
          pageSize: 100,
          pageNumber: 1,
        };
        const res2 = await AdminApi.getCourse(pagination);

        setCourse(res2.data.data);
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);
  /* State destructuring */

  const newProductData = [];
  if (course !== null) {
    course.map((value) => {
      const { courseName, cost } = value;
      return newProductData.push({
        cName: (
          <div className="flex items-center">
            <span className="font-medium capitalize text-dark dark:text-white87 text-15 ml-[10px]">{courseName}</span>
          </div>
        ),
        price: (
          <span className="font-medium text-[14px] text-dark dark:text-white87 mr-[10px]">
            <CountUp start={0} end={cost} duration={0.5} /> VND
          </span>
        ),
      });
    });
  }

  return (
    <GlobalUtilityStyle className="h-full">
      <Cards
        title="New Product"
        size="large"
        className="h-full border-none ant-card-body-p-25 ant-card-body-pt-0 ant-card-head-px-25 ant-card-head-b-none ant-card-head-title-base"
      >
        <TableDefaultStyle>
          <div>
            <div className="table-pl-0 hover-tr-none table-pt-15 table-responsive">
              <Table columns={productColumns} dataSource={newProductData} pagination={false} />
            </div>
          </div>
        </TableDefaultStyle>
      </Cards>
    </GlobalUtilityStyle>
  );
});

export default NewCourse;

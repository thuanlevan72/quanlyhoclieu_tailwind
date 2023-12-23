import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import OverviewCard from '../../../../components/cards/OverviewCardTwo';
import { AdminApi } from '../../../../config/api/admin/AdminApi';

function OverviewDataList() {
  const [values, setValues] = useState({
    revenue: {
      id: 1,
      type: 'success',
      icon: 'dollar-circle.svg',
      label: 'Revenue',
      total: 0,
      suffix: ' VND',
      prefix: '',
      status: 'growth',
      statusRate: '100',
      decimels: 0,
      dataPeriod: 'Since last month',
      statusColor: 'success',
    },
    boughtCourse: {
      id: 2,
      type: 'info',
      icon: 'arrow-growth.svg',
      label: 'Bought Course',
      total: 0,
      suffix: ' Courses',
      prefix: '',
      status: 'growth',
      statusRate: '100',
      decimels: 0,
      dataPeriod: 'Since last month',
      statusColor: 'success',
    },
    totalStudent: {
      id: 3,
      type: 'primary',
      icon: 'briefcase.svg',
      label: 'Student',
      total: 0,
      suffix: '',
      prefix: '',
      status: 'growth',
      statusRate: '100',
      decimels: 0,
      dataPeriod: 'Since last month',
      statusColor: 'success',
    },
    totalTutor: {
      id: 4,
      type: 'secondary',
      icon: 'briefcase.svg',
      label: 'Tutor',
      total: 0,
      suffix: '',
      prefix: '',
      status: 'growth',
      statusRate: '100',
      decimels: 0,
      dataPeriod: 'Since last month',
      statusColor: 'success',
    },
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const pagination = {
          pageSize: 100,
          pageNumber: 1,
        };
        const res = await AdminApi.getRevenue();
        const res2 = await AdminApi.getFee(pagination);
        const res3 = await AdminApi.getStudent(pagination);
        const res4 = await AdminApi.getTutor(pagination);
        const count = res2.data.data.filter((x) => x.status === 'Done');
        setValues({
          ...values,
          revenue: {
            ...values.revenue,
            total: res.data,
          },
          boughtCourse: {
            ...values.boughtCourse,
            total: count.length,
          },
          totalStudent: {
            ...values.totalStudent,
            total: res3.data.data.length,
          },
          totalTutor: {
            ...values.totalTutor,
            total: res4.data.data.length,
          },
        });
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Row gutter={25}>
        <Col xxl={6} sm={12} xs={24} className="mb-[25px]">
          <OverviewCard data={values.revenue} contentFirst halfCircleIcon />
        </Col>
        <Col xxl={6} sm={12} xs={24} className="mb-[25px]">
          <OverviewCard data={values.boughtCourse} contentFirst halfCircleIcon />
        </Col>
        <Col xxl={6} sm={12} xs={24} className="mb-[25px]">
          <OverviewCard data={values.totalStudent} contentFirst halfCircleIcon />
        </Col>
        <Col xxl={6} sm={12} xs={24} className="mb-[25px]">
          <OverviewCard data={values.totalTutor} contentFirst halfCircleIcon />
        </Col>
      </Row>
    </div>
  );
}

export default OverviewDataList;

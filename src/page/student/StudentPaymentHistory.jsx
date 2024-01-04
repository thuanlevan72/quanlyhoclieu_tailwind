import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { GlobalUtilityStyle, PaginationStyle } from '../../container/styled';
import { StudentApi } from '../../config/api/student/StudentApi';

function Orders() {
  const PageRoutes = [
    {
      path: '/student',
      breadcrumbName: 'Home',
    },
    {
      path: '',
      breadcrumbName: 'Payment History',
    },
  ];
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 1000000,
  });
  const [pm, setPm] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setPagination({
          pageNumber: 1,
          pageSize: 1000000,
        });
        const res = await StudentApi.getPaymentHistory(pagination);
        setPm(res.data.data.reverse());
      } catch (error) {
        setPm([]);
      }
    }
    fetchData();
  }, []);

  const dataSource = [];
  if (pm.length) {
    pm.map((value, key) => {
      const { paymentHistoryID, paymentName, amount, createAt, paymentTypeID } = value;
      return dataSource.push({
        key: key + 1,
        id: <span className="font-medium text-body dark:text-white60">{paymentHistoryID}</span>,
        name: <span className="font-medium text-body dark:text-white60">{paymentName}</span>,
        amount: <span className="font-medium text-body dark:text-white60">{amount.toLocaleString('en-US')}</span>,
        paymentType: (
          <span className="font-medium text-body dark:text-white60">{`${
            paymentTypeID === 1 ? 'Recharge' : 'Cash out'
          }`}</span>
        ),
        date: (
          <span className="float-right font-medium text-right text-body dark:text-white60">
            {createAt.substring(0, 10)}
          </span>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Payment Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Payment name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Create At',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Payment History"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <GlobalUtilityStyle className="bg-white dark:bg-white10 p-[25px] md:px-[15px] rounded-10">
          <Row gutter={15}>
            <Col md={24}>
              <PaginationStyle>
                <div className="ant-pagination-custom-style table-responsive table-head-rounded table-th-shape-none table-th-border-none table-last-th-text-right hover-tr-none table-td-border-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
                  <Table
                    className="[&>div>div>.ant-table]:mb-7 [&>div>div>.ant-table]:pb-5 [&>div>div>.ant-table]:border-b [&>div>div>.ant-table]:border-regular dark:[&>div>div>.ant-table]:border-white10 ltr:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pl-[20px] ltr:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pl-[20px] rtl:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pr-[20px] rtl:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pr-[20px] "
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ pageSize: 7, showSizeChanger: true, total: pm.length }}
                  />
                </div>
              </PaginationStyle>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </>
  );
}

export default Orders;

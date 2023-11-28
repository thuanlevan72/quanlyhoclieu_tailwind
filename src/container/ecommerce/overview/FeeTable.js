import { Col, Row, Skeleton, Table } from 'antd';
import { useState, useEffect, Suspense } from 'react';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Ordersummary from './Ordersummary';
import Heading from '../../../components/heading/heading';
import { GlobalUtilityStyle } from '../../styled';
import feeData from '../../../demoData/fee.json';

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
  ];
  const [state, setState] = useState({
    fee: feeData,
  });
  const { fee } = state;
  useEffect(() => {
    if (feeData) {
      setState({
        fee: feeData,
      });
    }
  }, []);
  const onHandleChecked = (key) => {
    setState((prevState) => ({
      fee: prevState.fee.map((item) => {
        if (item.id === key) {
          if (!item.isChecked) {
            item.isChecked = true;
          } else {
            item.isChecked = false;
          }
        }
        return item;
      }),
    }));
  };
  let subtotal = 0;
  fee.map((data) => {
    if (data.isChecked) subtotal += data.price;
    return data;
  });
  localStorage.setItem('subtotal', subtotal);
  localStorage.setItem('feelist', JSON.stringify(fee));
  if (fee !== null) {
    fee.map((data) => {
      const { id, img, name, price, isChecked } = data;
      return productTableData.push({
        course: (
          <div className="cart-single">
            <figure className="flex items-center mb-0">
              <Checkbox className="pr-2" checked={isChecked} onChange={() => onHandleChecked(id)} />
              <img
                className="max-w-[80px] min-h-[80px] ltr:mr-[25px] rtl:ml-[25px] rounded-[10px]"
                style={{ width: 80 }}
                src={require(`../../../static/img/courses/${img}`)}
                alt=""
              />
              <figcaption>
                <div className="cart-single__info">
                  <Heading as="h6" className="text-base font-medium text-dark dark:text-white87">
                    {name}
                  </Heading>
                </div>
              </figcaption>
            </figure>
          </div>
        ),
        price: <span className="text-body dark:text-white60 text-[15px]">${price}</span>,
        date: <span className="text-body dark:text-white60 text-[15px]">28/10/2023</span>,
      });
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

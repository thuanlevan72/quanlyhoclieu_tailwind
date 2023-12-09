import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Row, Col, Radio, Table, Button } from 'antd';
import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import { useDispatch } from 'react-redux';
import { Steps } from '../../../components/steps/steps';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { GlobalUtilityStyle } from '../../styled';
import { cartGetData } from '../../../redux/cart/actionCreator';
import { StudentApi } from '../../../config/api/student/StudentApi';

function CheckOut() {
  function handlePayWithBankingClick() {
    window.alert('Please wait 5 seconds.');
  }
  const authInfoJSON = localStorage.getItem('authInfo');
  const authInfo = JSON.parse(authInfoJSON);
  const subtotal = localStorage.getItem('subtotal');
  const feelistJSON = localStorage.getItem('feelist');
  const feelist = JSON.parse(feelistJSON);
  const checkedlist = feelist.filter((x) => x.isChecked === true);
  const dataSource = [];
  const dispatch = useDispatch();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
  });
  const { status, isFinished, current } = state;

  useEffect(() => {
    if (cartGetData) {
      dispatch(cartGetData());
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    const activeElement = document.querySelectorAll('.ant-steps-item-active');
    const successElement = document.querySelectorAll('.ant-steps-item-finish');

    activeElement.forEach((element) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        if (bgImage.classList.contains('success-step-item')) {
          bgImage.classList.remove('success-step-item');
        } else {
          bgImage.classList.remove('wizard-step-item');
        }
        bgImage.classList.add('wizard-steps-item-active');
      }
    });

    successElement.forEach((element) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        bgImage.classList.remove('wizard-steps-item-active');
        bgImage.classList.add('success-step-item');
        // if(bgImage.classList.has('.ant-steps-item-active'))
      }
    });
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };
  const [totalMoney, setTotalMoney] = useState(authInfo.totalMoney);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await StudentApi.getTotalMoney();
        setTotalMoney(res.data);
      } catch (error) {
        return 'error';
      }
    }
    fetchData();
  }, [totalMoney]);
  const processPayment = async () => {
    try {
      await Promise.all(
        feelist.map(async (value) => {
          if (value.isChecked === true) {
            const res = await StudentApi.payFee(value.feeID);
            return res;
          }
          return null;
        }),
      );
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  const done = async () => {
    const confirm = window.confirm('Are you sure to submit the order?');
    if (confirm) {
      await processPayment();
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });
    }
  };
  const courses = localStorage.getItem('courses');
  const coursesObject = JSON.parse(courses);
  if (checkedlist.length !== 0) {
    checkedlist.map((data) => {
      const { courseID, feeID, cost } = data;
      let index = -1;
      coursesObject.map((value, i) => {
        if (value.courseID === courseID) {
          index = i;
          return i;
        }
        return -1;
      });
      return dataSource.push({
        key: feeID,
        name: (
          <div className="w-[300px]">
            <div className="flex items-center gap-x-[25px]">
              <figcaption>
                <div>
                  <Heading as="h6" className="mb-2 text-base font-medium text-dark dark:text-white87">
                    {coursesObject[index].courseName}
                  </Heading>
                </div>
              </figcaption>
            </div>
          </div>
        ),
        price: <span className="text-body dark:text-white60 text-[15px]">{cost}VND</span>,
      });
    });
  }
  const columns = [
    {
      title: 'Course',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];
  const step2Content = () => {
    if (status !== 'finish') {
      if (paymentMethod === 'card') {
        return (
          <div className="w-full 3xl:px-[30px] ssm:px-[15px]">
            <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold ml-[8px]">
              2. Review and confirm Order
            </Heading>
            <GlobalUtilityStyle>
              <div className="p-[25px] ssm:px-[15px] rounded-[10px] border border-normal dark:border-white10">
                <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
                  <Button
                    id="payWithBankingButton"
                    style={{ width: '100%' }}
                    value="card"
                    className="[&>span:not(.ant-radio)]:w-full ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span.ant-radio]:mt-[30px]"
                    onClick={handlePayWithBankingClick}
                  >
                    Check Status
                  </Button>
                  <div className="border-b table-responsive table-bg-transparent table-head-none hover-tr-none table-td-border-none border-regular dark:border-white10">
                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                  </div>
                  <Row justify="end">
                    <Col xxl={8} xl={5} md={9} sm={14} xs={24}>
                      <div className="invoice-summary-inner">
                        <ul className="flex flex-col mt-5 mb-[10px]">
                          <li className="inline-flex justify-between">
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">Subtotal :</span>
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">{`${subtotal.toLocaleString(
                              'en-US',
                            )}VND`}</span>
                          </li>
                          <li className="inline-flex justify-between">
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">Discount :</span>
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">{`${0}VND`}</span>
                          </li>
                          <li className="inline-flex justify-between">
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">
                              Shipping Charge :
                            </span>
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">{`${0}VND`}</span>
                          </li>
                        </ul>
                        <Heading className="flex justify-between" as="h4">
                          <span className="text-base font-medium text-dark dark:text-white87">Total : </span>
                          <span className="text-lg font-semibold text-primary">{`${subtotal.toLocaleString(
                            'en-US',
                          )}VND`}</span>
                        </Heading>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </GlobalUtilityStyle>
          </div>
        );
      }
      if (paymentMethod === 'totalMoney') {
        return (
          <div className="w-full 3xl:px-[30px] ssm:px-[15px]">
            <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold ml-[8px]">
              2. Review and confirm Order
            </Heading>
            <GlobalUtilityStyle>
              <div className="p-[25px] ssm:px-[15px] rounded-[10px] border border-normal dark:border-white10">
                <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
                  <div>
                    <Heading
                      as="h5"
                      className="flex items-center justify-between mb-[25px] text-body dark:text-white60 text-lg font-normal"
                    >
                      Total Money
                    </Heading>
                  </div>
                  <div className="mb-2 text-[15px] font-medium">{totalMoney.toLocaleString('en-US')} VND</div>
                </div>
                <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
                  <div className="border-b table-responsive table-bg-transparent table-head-none hover-tr-none table-td-border-none border-regular dark:border-white10">
                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                  </div>
                  <Row justify="end">
                    <Col xxl={8} xl={5} md={9} sm={14} xs={24}>
                      <div className="invoice-summary-inner">
                        <ul className="flex flex-col mt-5 mb-[10px]">
                          <li className="inline-flex justify-between">
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">Subtotal :</span>
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">{`${subtotal.toLocaleString(
                              'en-US',
                            )}VND`}</span>
                          </li>
                          <li className="inline-flex justify-between">
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">Discount :</span>
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">{`${0}VND`}</span>
                          </li>
                          <li className="inline-flex justify-between">
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">
                              Shipping Charge :
                            </span>
                            <span className="text-dark dark:text-white87 text-[15px] font-medium">{`${0}VND`}</span>
                          </li>
                        </ul>
                        <Heading className="flex justify-between" as="h4">
                          <span className="text-base font-medium text-dark dark:text-white87">Total : </span>
                          <span className="text-lg font-semibold text-primary">{`${subtotal.toLocaleString(
                            'en-US',
                          )}VND`}</span>
                        </Heading>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </GlobalUtilityStyle>
          </div>
        );
      }
    } else {
      return (
        <Row justify="center" style={{ width: '100%' }}>
          <Col xl={22} xs={24}>
            <div className="checkout-successful 3xl:px-[30px]">
              <Cards
                headless
                bodyStyle={{
                  borderRadius: '20px',
                }}
              >
                <Cards headless>
                  <span className="icon-success">
                    <UilCheck />
                  </span>
                  <Heading as="h3">Payment Successful</Heading>
                  <p>Thank you! We have received your Payment</p>
                </Cards>
              </Cards>
            </div>
          </Col>
        </Row>
      );
    }
  };
  return (
    <Steps
      className="mx-[10px]"
      isswitch
      current={0}
      status={status}
      steps={[
        {
          className: 'm-[30px]',
          title: 'Payment Method',
          content: (
            <div className="w-[580px] sm:px-[25px] ssm:px-[15px]">
              <Row justify="center">
                <Col sm={22} xs={24}>
                  <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                    1. Please Select Your Payment Method
                  </Heading>
                  <Radio.Group style={{ width: '100%' }}>
                    <div className="mb-[25px]">
                      <Radio
                        style={{ width: '100%' }}
                        onChange={handlePaymentMethodChange}
                        value="card"
                        className="[&>span:not(.ant-radio)]:w-full ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span.ant-radio]:mt-[30px]"
                      >
                        <Cards
                          headless
                          className="[&>.ant-card-body]:p-[25px] sm:[&>.ant-card-body]:p-[15px] bg-[#f7f8fa] dark:bg-[#282b36] border-1 border-solid border-normal dark:border-white10"
                          bodyStyle={{
                            borderRadius: '20px',
                          }}
                        >
                          <div className="flex items-center justify-between flex-wrap mb-[20px] gap-[10px]">
                            <span className="text-body dark:text-white60">Pay With Banking</span>
                          </div>
                          <Cards
                            className="[&>.ant-card-body]:p-[25px] dark:bg-[#1b1d2a]"
                            headless
                            style={{ marginBottom: 0 }}
                          >
                            <h4 className="text-xs italic underline">Scan this before go to the next step.</h4>
                            <img style={{ width: '100%' }} src={require('../../../static/img/qr.png')} alt="" />
                          </Cards>
                        </Cards>
                      </Radio>
                    </div>
                    <div className="mb-[25px]">
                      <Radio
                        value="totalMoney"
                        onChange={handlePaymentMethodChange}
                        style={{ width: '100%' }}
                        className="ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-regular dark:[&>span:not(.ant-radio)]:border-white10 [&>span:not(.ant-radio)]:rounded-[10px]"
                      >
                        Pay With Total Money
                      </Radio>
                    </div>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          className: 'm-[30px]',
          title: 'Review Order',
          content: step2Content(),
        },
      ]}
      onNext={next}
      onPrev={prev}
      onDone={done}
      isfinished={isFinished}
    />
  );
}

export default CheckOut;

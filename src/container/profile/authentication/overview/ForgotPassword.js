import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthFormWrap } from './style';
// import { forgotPassword } from '../../../../redux/authentication/actionCreator';
import { AuthService } from '../../../../config/api/student/AuthService';

function ForgotPassword() {
  // const dispatch = useDispatch();
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsTimerRunning(false);
      setTimer(60);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const [state, setState] = useState({
    values: null,
  });

  const handleButtonClick = (values) => {
    console.log(values);
    setTimer(60);
    setIsTimerRunning((prevIsTimerRunning) => !prevIsTimerRunning);
  };

  const handleSubmit = async (values) => {
    const response = await AuthService.forgotPassword({ email: values.email });
    console.log(response.data);
    setState({ ...state, values });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
            <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
              <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">Forgot Password?</h2>
            </div>
            <div className="px-10 pt-8 pb-6">
              <p className="mb-4 dark:text-white60">
                Enter the email address you used when you joined and we’ll send you instructions to reset your password.
              </p>
              <div className="flex items-center">
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                  className="w-[100%]"
                >
                  <Input required placeholder="name@example.com" />
                </Form.Item>
                {/* <Button
                  className={`mt-[10px] mx-[10px] border-[#ffa502] hover:bg-[#eccc68]
                   hover:text-white text-body ${
                     isTimerRunning ? 'cursor-not-allowed hover:bg-white hover:text-body' : ''
                   }`}
                  onClick={timer === 60 ? () => handleButtonClick() : () => {}}
                >
                  {isTimerRunning && timer > 0 ? `${timer}s` : 'Send'}
                </Button> */}
              </div>
              {/* <Form.Item
                label="Verify Code"
                name="verifyCode"
                rules={[{ required: true, message: 'Please input your code!', type: 'string' }]}
                className="w-[80%]"
              >
                <Input placeholder="Verify Code" />
              </Form.Item> */}
              {/* <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!', type: 'string' }]}
                className="w-[80%]"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ required: true, message: 'Please confirm your password!', type: 'string' }]}
                className="w-[80%]"
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item> */}
              <Form.Item>
                <Button
                  className={`bg-white text-black hover:text-white border-[#ffa502] hover:bg-[#eccc68] block w-full h-12 p-0 text-sm font-medium  ${
                    isTimerRunning ? 'cursor-not-allowed hover:bg-white hover:text-body' : ''
                  }`}
                  onClick={timer === 60 ? () => handleButtonClick() : () => {}}
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  {isTimerRunning && timer > 0 ? `${timer}s` : 'Send'}
                </Button>
              </Form.Item>
            </div>
            <div className="p-6 text-center bg-section dark:bg-white10 rounded-b-md">
              <p className="mb-0 text-sm font-medium text-body dark:text-white60">
                Return to
                <Link to="/" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ForgotPassword;

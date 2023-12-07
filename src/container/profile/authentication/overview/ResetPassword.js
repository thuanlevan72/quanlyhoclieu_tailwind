import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { AuthFormWrap } from './style';
import { AuthService } from '../../../../config/api/student/AuthService';

function ResetPassword() {
  const [state, setState] = useState({
    values: null,
  });

  const handleSubmit = async (values) => {
    console.log(values);
    if (values.password !== values.confirmPassword) {
      alert('not match');
    } else {
      const response = await AuthService.resetPassword(values.password, values.confirmPassword);
      alert(response.data);
      if (response.data === 'Password successfully reset') {
        window.location.href = '/login'; // Thay '/login' bằng đường dẫn của trang đăng nhập
      }
    }

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
              <Form.Item
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
              </Form.Item>
              <Form.Item>
                <Button
                  className="block w-full h-12 p-0 text-sm font-medium"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Reset Password
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

export default ResetPassword;

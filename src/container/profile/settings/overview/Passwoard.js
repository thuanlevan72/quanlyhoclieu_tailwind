import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { GlobalUtilityStyle } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { StudentApi } from '../../../../config/api/student/StudentApi';

function Password() {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const handleSubmit = async (values) => {
    try {
      if (!values.old || !values.new || !values.confirm) {
        message.error("Can't be blank");
      } else if (values.new !== values.confirm) {
        message.error('Password and confirm password do not match');
      } else if (password !== localStorage.getItem('hide')) {
        message.error('Password incorrect!');
      } else {
        const response = await StudentApi.changePassword({
          password: values.old,
          newPassword: values.new,
          confirmPassword: values.confirm,
        });
        console.log(response.data);
        message.success('Password changed successfully!');
        localStorage.setItem('hide', values.new);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      message.error('Failed to change password. Please check your input and try again.');
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    form.resetFields();
  };

  return (
    <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
      <div className="py-[18px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
        <Heading as="h4" className="mb-0 text-lg font-medium">
          Password Settings
        </Heading>
        <span className="mb-0.5 text-light dark:text-white60 text-13 font-normal">
          Change or reset your account password
        </span>
      </div>
      <div className="p-[25px]">
        <GlobalUtilityStyle>
          <Row justify="center">
            <Col xxl={12} sm={16} xs={24}>
              <Form form={form} name="changePassword" onFinish={handleSubmit}>
                <Form.Item
                  required
                  name="old"
                  label="Old Password"
                  className="mb-4 form-label-w-full form-label-text-start"
                >
                  <Input.Password onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item name="new" label="New Password" className="mb-0 form-label-w-full form-label-text-start">
                  <Input.Password />
                </Form.Item>
                <p className="mb-0 text-light dark:text-white60 text-[13px]">Minimum 6 characters</p>
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  className="mb-0 form-label-w-full form-label-text-start"
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item className="mb-7">
                  <div className="flex items-center flex-wrap gap-[15px] mt-11">
                    <Button htmlType="submit" type="primary" className="h-11 px-[20px]">
                      Change Password
                    </Button>
                    <Button
                      size="default"
                      onClick={handleCancel}
                      type="light"
                      className="h-11 px-[20px] bg-transparent dark:text-white87 dark:border-white10 dark:hover:text-primary dark:hover:border-primary"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </div>
  );
}

export default Password;

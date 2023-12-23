import React, { useState } from 'react';
import { Row, Col, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';

function CourseParts() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [state, setState] = useState({
    values: '',
  });
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };
  const [count, setCount] = useState(0);
  const onHandleCount = () => {
    if (count < 10) {
      setCount(count + 1);
    } else message.warning('Course Part Max: 10');
  };
  const renderFormItems = () => {
    const formItems = [];
    for (let i = 0; i < count; i += 1) {
      formItems.push(
        <Form.Item key={i} name={`${i}`} label={`Part ${i + 1}`}>
          <Input placeholder={`Part ${i + 1}`} />
        </Form.Item>,
      );
    }
    return formItems;
  };

  const onHandleNext = () => {
    const values = form.getFieldValue();
    const data = Object.values(values);
    localStorage.setItem('coursePart', JSON.stringify(data));
    navigate('/admin/manage/course/add-course/course-adding');
  };
  const onhandleReset = () => {
    setCount(0);
    localStorage.removeItem('coursePart');
  };
  return (
    <Row justify="center">
      <Col xxl={10} xl={14} md={16} xs={24}>
        <div className="">
          <Form style={{ width: '100%' }} form={form} name="work" onFinish={handleSubmit}>
            <Heading className=" text-[18px] font-medium mb-[36px] text-dark dark:text-white87" as="h4">
              Course Parts
            </Heading>
            <Form.Item>
              <Button onClick={() => onHandleCount()} className="flex items-center">
                <UilPlus /> <div className="text-[20px]">Part</div>
              </Button>
            </Form.Item>
            {renderFormItems()}
            <Form.Item>
              <div className="flex items-center min-md:justify-end justify-center mt-[15px]">
                <Button
                  className="bg-regularBG dark:bg-regularBGdark h-[38px] ltr:mr-[20px] rtl:ml-[20px] px-[22px] text-[15px] text-body dark:text-white60 hover:text-light font-normal border-regular dark:border-white10"
                  type="default"
                  htmlType="submit"
                >
                  <Link to="/admin/manage/course/add-course/course-info">Back</Link>
                </Button>
                <Button
                  className="bg-regularBG dark:bg-regularBGdark h-[38px] ltr:mr-[20px] rtl:ml-[20px] px-[22px] text-[15px] text-body dark:text-white60 hover:text-light font-normal border-regular dark:border-white10"
                  type="default"
                  onClick={() => onhandleReset()}
                >
                  Reset
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="bg-primary hover:bg-primary-hover h-[38px] px-[22px] text-[15px] text-white dark:text-white87 font-normal border-primary"
                  onClick={onHandleNext}
                >
                  Next
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default CourseParts;

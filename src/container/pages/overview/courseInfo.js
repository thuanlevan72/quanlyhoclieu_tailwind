import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { AdminApi } from '../../../config/api/admin/AdminApi';

const { Option } = Select;
function CourseInfo() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    values: '',
  });
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };
  const [tutor, setTutor] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const values = {
          pageNumber: 1,
          pageSize: 100,
        };
        const res = await AdminApi.getTutor(values);
        setTutor(res.data.data);
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);

  const onHandleNext = () => {
    const values = form.getFieldValue();
    if (values.cost > 0 && values.courseName && values.courseDescription && values.tutorID) {
      localStorage.setItem('courseInfo', JSON.stringify(values));
      navigate('/admin/manage/course/add-course/course-parts');
    } else {
      message.warning('Failed');
    }
  };
  return (
    <Row gutter={25} justify="center">
      <Col xxl={10} xl={14} md={16} xs={24}>
        <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
          <Heading className="text-[18px] font-medium mb-[36px] text-dark dark:text-white87" as="h4">
            Course Information
          </Heading>

          <figure className="relative max-w-[400px] mb-[30px] flex items-center gap-[20px]">
            <img className="" src={require('../../../static/img/courses/1.png')} alt="" />
            <figcaption>
              <Upload
                className="[&>.ant-upload-select]:inline-flex [&>.ant-upload-select]:items-center 
              [&>.ant-upload-select]:justify-center [&>.ant-upload-select]:w-[40px] [&>.ant-upload-select]:h-[40px] 
              [&>.ant-upload-select]:rounded-full [&>.ant-upload-select]:absolute ltr:[&>.ant-upload-select]:left-[350px] 
              rtl:[&>.ant-upload-select]:right-[85px] [&>.ant-upload-select]:bottom-[5px] [&>.ant-upload-select]:z-[10] 
              [&>.ant-upload-select]:bg-white dark:[&>.ant-upload-select]:bg-white10 
              [&>.ant-upload-select>.ant-upload]:text-white dark:[&>.ant-upload-select>.ant-upload]:text-white87 
              [&>.ant-upload-select>.ant-upload]:inline-flex [&>.ant-upload-select>.ant-upload]:items-center 
              [&>.ant-upload-select>.ant-upload]:justify-content-center [&>.ant-upload-select>.ant-upload]:w-[32px] 
              [&>.ant-upload-select>.ant-upload]:h-[32px] [&>.ant-upload-select>.ant-upload]:rounded-full 
              [&>.ant-upload-select>.ant-upload]:justify-center [&>.ant-upload-select>.ant-upload]:z-[1] 
              [&>.ant-upload-select>.ant-upload]:bg-primary [&>.ant-upload-select>.ant-upload>a]:flex 
              [&>.ant-upload-select>.ant-upload>a]:items-center [&>.ant-upload-select>.ant-upload>a]:justify-center 
              [&>.ant-upload-select>.ant-upload>a>svg]:text-white dark:[&>.ant-upload-select>.ant-upload>a]:text-white10"
              >
                <Link className="rony2" to="#">
                  <UilCamera />
                </Link>
              </Upload>
              <div className="">
                <Heading as="h4">Course Photo</Heading>
              </div>
            </figcaption>
          </figure>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            label="Name"
            name="courseName"
            rules={[{ required: true, message: '*Required' }]}
          >
            <Input className="rounded-6" placeholder="Input Course Name" />
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            name="courseDescription"
            label="Course description"
          >
            <Input className="rounded-6" placeholder="Input Course Description" />
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            name="tutorID"
            label="Tutor"
            rules={[{ required: true, message: '*Required' }]}
          >
            <Select style={{ width: '100%' }} value={tutor} placeholder="Select course">
              {tutor.length !== 0 ? (
                tutor &&
                tutor.map((value) => {
                  return <Option value={value.tutorID}>{value.fullName}</Option>;
                })
              ) : (
                <Option value={0}>Null</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            name="cost"
            label="Cost"
            rules={[{ required: true, message: '*Required' }]}
          >
            <Input type="number" className="rounded-6" placeholder="" />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center min-md:justify-end justify-center mt-[15px]">
              <Button
                className="bg-regularBG dark:bg-regularBGdark h-[38px] ltr:mr-[20px] rtl:ml-[20px] px-[22px] text-[15px] text-body dark:text-white60 hover:text-light font-normal border-regular dark:border-white10"
                onClick={() => {
                  return form.resetFields();
                }}
              >
                Reset
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-primary hover:bg-primary-hover h-[38px] px-[22px] text-[15px] text-white dark:text-white87 font-normal border-primary"
                onClick={onHandleNext}
              >
                {/* <Link to="/admin/manage/course/add-course/course-parts">Save & Next</Link> */}
                Save & Next
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default CourseInfo;

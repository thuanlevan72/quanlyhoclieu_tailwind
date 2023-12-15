import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';
import { getCities, getCommune, getDistricts } from '../../../config/dataService/ProvinceOpenAPI';
import { AdminApi } from '../../../config/api/admin/AdminApi';

const { Option } = Select;
function TutorInfo() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [state, setState] = useState({
    values: '',
  });
  const [address, setAddress] = useState({
    province: 0,
    district: 0,
    commune: 0,
  });

  const handleDistrictChange = async (values) => {
    setAddress({
      province: values,
      district: 0,
      commune: 0,
    });
    const res = await getDistricts(values);
    if (!res.data) {
      setAddress({
        province: 0,
        district: 0,
        commune: 0,
      });
      return;
    }
    setDistricts(res.data.districts);
  };
  const handleCommuneChange = async (values) => {
    setAddress({
      province: address.province,
      district: values,
      commune: 0,
    });
    const res = await getCommune(values);
    if (!res.data) {
      setAddress({
        province: address.province,
        district: 0,
        commune: 0,
      });
      return;
    }
    setCommunes(res.data.wards);
  };
  const handleCommuneChangeEnd = async (values) => {
    setAddress({
      ...address,
      commune: values,
    });
  };
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    // Gọi API lấy danh sách tỉnh thành
    async function fetchMyAPI() {
      const res = await getCities();
      const res1 = await AdminApi.getAvailableAccount({ pageSize: 100, pageNumber: 1 }, 3);
      setAccounts(res1.data.data);
      setCities(res.data);
    }
    fetchMyAPI();
  }, []);
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };
  const [values, setValues] = useState({
    accountId: 0,
    communeID: 0,
    contactNumber: '',
    districtID: 0,
    email: '',
    fullName: '',
    provinceID: '',
  });
  const fetchDataM = async (data) => {
    try {
      const res = await AdminApi.addTutor(data);
      return res;
    } catch (error) {
      message.warning('Call Failed');
    }
  };
  const handleDone = () => {
    const input = form.getFieldsValue();
    setValues({
      ...values,
      accountId: input.accountID,
      communeID: input.commune,
      contactNumber: input.contactNumber,
      districtID: input.district,
      email: input.email,
      fullname: input.fullname,
      provinceID: input.province,
    });
    const res = fetchDataM(values);
    if (res === 'Succeed') message.success('Added');
    else message.warning('Failed');
  };
  return (
    <Row justify="center">
      <Col xxl={10} xl={14} md={16} xs={24}>
        <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
          <Heading className="text-[18px] font-medium mb-[36px] text-dark dark:text-white87 mt-[80px]" as="h4">
            Tutor Information
          </Heading>

          <figure className="relative max-w-[260px] mb-[30px] flex items-center gap-[20px]">
            <img className="rounded-full" src={require('../../../static/img/avatar/profileImage.png')} alt="" />
            <figcaption>
              <Upload className="[&>.ant-upload-select]:inline-flex [&>.ant-upload-select]:items-center [&>.ant-upload-select]:justify-center [&>.ant-upload-select]:w-[40px] [&>.ant-upload-select]:h-[40px] [&>.ant-upload-select]:rounded-full [&>.ant-upload-select]:absolute ltr:[&>.ant-upload-select]:left-[85px] rtl:[&>.ant-upload-select]:right-[85px] [&>.ant-upload-select]:bottom-[5px] [&>.ant-upload-select]:z-[10] [&>.ant-upload-select]:bg-white dark:[&>.ant-upload-select]:bg-white10 [&>.ant-upload-select>.ant-upload]:text-white dark:[&>.ant-upload-select>.ant-upload]:text-white87 [&>.ant-upload-select>.ant-upload]:inline-flex [&>.ant-upload-select>.ant-upload]:items-center [&>.ant-upload-select>.ant-upload]:justify-content-center [&>.ant-upload-select>.ant-upload]:w-[32px] [&>.ant-upload-select>.ant-upload]:h-[32px] [&>.ant-upload-select>.ant-upload]:rounded-full [&>.ant-upload-select>.ant-upload]:justify-center [&>.ant-upload-select>.ant-upload]:z-[1] [&>.ant-upload-select>.ant-upload]:bg-primary [&>.ant-upload-select>.ant-upload>a]:flex [&>.ant-upload-select>.ant-upload>a]:items-center [&>.ant-upload-select>.ant-upload>a]:justify-center [&>.ant-upload-select>.ant-upload>a>svg]:text-white dark:[&>.ant-upload-select>.ant-upload>a]:text-white10">
                <Link className="rony2" to="#">
                  <UilCamera />
                </Link>
              </Upload>
              <div className="">
                <Heading as="h4">Tutor Photo</Heading>
              </div>
            </figcaption>
          </figure>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: '*Required' }]}
          >
            <Input className="rounded-6" placeholder="Input Name" />
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            label="Email Address"
            name="email"
            rules={[{ message: 'Please input your email!', type: 'email', required: true }]}
          >
            <Input className="rounded-6" placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            name="contactNumber"
            label="Phone Number"
            rules={[{ required: true, message: '*Required' }]}
          >
            <Input className="rounded-6" placeholder="+440 2546 5236" />
          </Form.Item>
          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            name="accountID"
            label="Account ID"
            rules={[{ required: true, message: '*Required' }]}
          >
            <Select style={{ width: '100%' }} value={accounts}>
              {accounts.length !== 0 ? (
                accounts &&
                accounts.map((value) => {
                  return <Option value={value.accountID}>{value.accountID}</Option>;
                })
              ) : (
                <Option value={-1}>Add more account</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Address"
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white87 font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white87"
            name="address"
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="province" rules={[{ required: true, message: 'Please select province' }]}>
                  <Select style={{ width: '100%' }} onChange={handleDistrictChange}>
                    <Option value={0}>Please select</Option>
                    {cities &&
                      cities.map((value) => (
                        <Option key={value.code} value={value.code}>
                          {value.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="district" rules={[{ required: true, message: 'Please select district' }]}>
                  <Select style={{ width: '100%' }} onChange={handleCommuneChange}>
                    <Option value={0}>Please select</Option>
                    {districts &&
                      districts.map((value) => (
                        <Option key={value.code} value={value.code}>
                          {value.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="commune" rules={[{ required: true, message: 'Please select commune' }]}>
                  <Select style={{ width: '100%' }} onChange={handleCommuneChangeEnd}>
                    <Option value={0}>Please select</Option>
                    {communes &&
                      communes.map((value) => (
                        <Option key={value.code} value={value.code}>
                          {value.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
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
                onClick={handleDone}
              >
                Done
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default TutorInfo;

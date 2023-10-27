import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Form, Input, Select } from 'antd';
import { Button } from '../../../../components/buttons/buttons';
import Heading from '../../../../components/heading/heading';
import { GlobalUtilityStyle } from '../../../styled';
import { getCities, getCommune, getDistricts } from '../../../../config/dataService/ProvinceOpenAPI';

const { Option } = Select;
function Profile() {
  const [form] = Form.useForm();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const { authInfo } = useSelector((states) => {
    return {
      authInfo: states.auth.authInfo,
    };
  });
  console.log(authInfo);
  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null,
  });
  const handleSubmit = (values) => {
    setState({ ...state, values: { ...values, tags: state.tags } });
  };
  const handleDistrictChange = async (values) => {
    const res = await getDistricts(values);
    setDistricts(res.data.districts);
  };
  const handleCommuneChange = async (values) => {
    const res = await getCommune(values);
    setCommunes(res.data.wards);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    form.resetFields();
  };
  useEffect(() => {
    // Gọi API lấy danh sách tỉnh thành
    async function fetchMyAPI() {
      const res = await getCities();
      setCities(res.data);
    }

    fetchMyAPI();
    if (authInfo.provinceID) {
      handleDistrictChange(authInfo.provinceID);
    }
    if (authInfo.districtID) {
      handleCommuneChange(authInfo.districtID);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
      <div className="py-[18px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
        <Heading as="h4" className="mb-0 text-lg font-medium">
          Edit Profile
        </Heading>
        <span className="mb-0.5 text-light dark:text-white60 text-13 font-normal">
          Set Up Your Personal Information
        </span>
      </div>
      <div className="p-[25px]">
        <GlobalUtilityStyle>
          <Row justify="center">
            <Col xxl={12} lg={16} xs={24}>
              <Form className="pt-2.5 pb-[30px]" name="editProfile" onFinish={handleSubmit}>
                <Form.Item
                  name="name"
                  initialValue={authInfo.lastName}
                  label="Name"
                  className="mb-4 form-label-w-full form-label-text-start dark:text-white-60"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  initialValue={authInfo.contactNumber}
                  label="Phone Number"
                  className="mb-4 form-label-w-full form-label-text-start"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="province"
                  initialValue={authInfo.provinceID}
                  label="Tỉnh thành"
                  className="mb-4 form-label-w-full form-label-text-start"
                >
                  <Select style={{ width: '100%' }} onChange={handleDistrictChange}>
                    {cities &&
                      cities.map((value) => {
                        return <Option value={value.code}>{value.name}</Option>;
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="city"
                  initialValue={authInfo.districtID}
                  label="City"
                  className="mb-4 form-label-w-full form-label-text-start"
                >
                  <Select style={{ width: '100%' }} onChange={handleCommuneChange}>
                    {districts &&
                      districts.map((value) => {
                        return <Option value={value.code}>{value.name}</Option>;
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="commune"
                  initialValue={authInfo.communeID}
                  label="Commune"
                  className="mb-4 form-label-w-full form-label-text-start"
                >
                  <Select style={{ width: '100%' }}>
                    <Option value="">Please Select</Option>
                    {communes &&
                      communes.map((value) => {
                        return <Option value={value.code}>{value.name}</Option>;
                      })}
                  </Select>
                </Form.Item>

                <div className="mt-11">
                  <Button size="default" htmlType="submit" type="primary" className="h-11 px-[20px] font-semibold">
                    Update Profile
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    size="default"
                    onClick={handleCancel}
                    type="light"
                    className="h-11 px-[20px] bg-regularBG dark:bg-white10 text-body dark:text-white87 font-semibold border-regular dark:border-white10"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </div>
  );
}

export default Profile;

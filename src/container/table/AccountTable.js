/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Row, Col, message, Button, Input, Select } from 'antd';
import UilLock from '@iconscout/react-unicons/icons/uil-lock';
// import UilSearch from '@iconscout/react-unicons/icons/uil-search';
import { PageHeader } from '../../components/page-headers/page-headers';
import Heading from '../../components/heading/heading';
import DataTable from '../../components/table/DataTable';
import { GlobalUtilityStyle, PaginationStyle } from '../styled';

import { AdminApi } from '../../config/api/admin/AdminApi';
import { Modal } from '../../components/modals/antd-modals';

function AccountTable() {
  const [visible, setVisible] = useState(false);
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Manage',
    },
    {
      path: 'second',
      breadcrumbName: 'Account',
    },
  ];
  const [accounts, setAccounts] = useState([]);
  const [reload, setReload] = useState(false);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await AdminApi.getAccount({ pageSize: 100000, pageNumber: 1 });
        setAccounts(res.data.data);
        setDatas(res.data.data);
      } catch (error) {
        message.warning(error);
      }
    }
    fetchData();
  }, [reload]);
  const [state, setState] = useState({
    text: '',
    id: 0,
  });
  const onHandleVisible = (type, accountID) => {
    setState({
      ...state,
      text: type === 1 ? 'Lock' : 'Unlock',
      id: accountID,
    });
    setVisible(true);
  };
  const fetchStatus = async () => {
    const res = await AdminApi.changeStatusAccount(state.id);
    return res;
  };
  const onhandleOk = () => {
    const res = fetchStatus();
    res
      .then((result) => {
        if (result.data === 'Done') {
          message.success('Done');
          setReload((preReload) => !preReload);
        } else message.warning('Failed');
      })
      .catch(() => {
        message.warning('Failed');
      });
    setVisible(false);
  };
  const tableDataScource = [];
  if (datas) {
    datas.map((item) => {
      const { accountID, decentralizationId, email, createAt, updateAt, status } = item;
      if (decentralizationId !== 1)
        return tableDataScource.push({
          accountID: <span className="text-body dark:text-white60 text-[15px] font-medium">{`#${accountID}`}</span>,
          decentralization:
            decentralizationId === 1 ? (
              <span className="text-body dark:text-white60 text-[15px] font-medium">Admin</span>
            ) : decentralizationId === 2 ? (
              <span className="text-body dark:text-white60 text-[15px] font-medium">Student</span>
            ) : (
              <span className="text-body dark:text-white60 text-[15px] font-medium">Tutor</span>
            ),
          email: <span className="text-body dark:text-white60 text-[15px] font-medium">{email}</span>,
          createAt: <span className="text-body dark:text-white60 text-[15px] font-medium">{createAt}</span>,
          updateAt: <span className="text-body dark:text-white60 text-[15px] font-medium">{updateAt}</span>,
          status:
            status === 'Working' ? (
              <span
                className={`inline-flex items-center justify-center 
            min-h-[24px] px-3 text-xs font-medium rounded-[15px] bg-green-100
            text-green-400`}
              >
                {status}
              </span>
            ) : (
              <span
                className={`inline-flex items-center justify-center 
            min-h-[24px] px-3 text-xs font-medium rounded-[15px] bg-red-100
            text-red-400`}
              >
                {status}
              </span>
            ),
          banButton:
            status === 'Working' ? (
              <span>
                <Button
                  className="flex items-center bg-red-100 text-[#ff4757] hover:border-[#ff4757]"
                  onClick={() => onHandleVisible(1, accountID)}
                >
                  <UilLock />
                  <div>Lock</div>
                </Button>
              </span>
            ) : (
              <span>
                <Button
                  className="flex items-center bg-green-100 text-[#2ed573] hover:border-[#2ed573]"
                  onClick={() => onHandleVisible(2, accountID)}
                  id={accountID}
                >
                  <UilLock />
                  <div>Unlock</div>
                </Button>
              </span>
            ),
        });
      return null;
    });
  }

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'accountID',
      key: 'accountID',
    },
    {
      title: 'Decentralization',
      dataIndex: 'decentralization',
      key: 'decentralization',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Update At',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      dataIndex: 'banButton',
      key: 'banButton',
    },
  ];
  const onHandleIDChange = (event) => {
    if (event.target.value.length > 0) {
      const current = accounts.findIndex((x) => x.accountID === parseInt(event.target.value));
      if (current !== -1) setDatas([accounts[current]]);
      else setDatas([]);
    } else setDatas(accounts);
  };
  const onHandleEmailChange = (event) => {
    if (event.target.value.length > 0) {
      const current = accounts.filter((x) => x.email.toUpperCase().includes(event.target.value.toUpperCase()));
      setDatas(current);
    } else setDatas(accounts);
  };
  const handleStatusSearch = (value) => {
    const current = accounts.filter((x) => x.status.toUpperCase() === value.toUpperCase());
    setDatas(current);
  };
  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Account manage"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <Modal visible={visible} width={700} onCancel={() => setVisible(false)} onOk={() => onhandleOk()}>
        <div className="text-[20px] text-body">{state.text} this account?</div>
      </Modal>
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <GlobalUtilityStyle>
          <Row gutter={15}>
            <Col xs={24} className="">
              <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10">
                <div>
                  <Heading as="h4" className="mb-0 text-lg font-medium mx-[20px]">
                    <div className="pt-[30px]">Search Box</div>
                  </Heading>
                </div>
                <div>
                  <Row gutter={15} className="py-[30px]">
                    <Col xs={24} lg={3} className="mb-[10px]">
                      <div className="mx-[20px] flex items-center">
                        <div className="min-w-[50px]">ID: </div>
                        <Input
                          className="w-[80%] py-[6px] ml-[5px]"
                          placeholder="ID"
                          onChange={(event) => {
                            onHandleIDChange(event);
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={24} lg={6} className="mb-[10px]">
                      <div className="mx-[20px] flex items-center">
                        <div className="min-w-[50px]">Email: </div>
                        <Input
                          className="w-[100%] py-[6px] ml-[5px]"
                          placeholder="Email"
                          onChange={(event) => {
                            onHandleEmailChange(event);
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={24} lg={6} className="mb-[10px]">
                      <div className="mx-[20px] flex items-center">
                        <div className="mr-[5px] min-w-[50px]">Status: </div>
                        <Select onChange={handleStatusSearch} style={{ width: 200 }} defaultValue="Working">
                          <Select.Option value="Working">Working</Select.Option>
                          <Select.Option value="Banned">Banned</Select.Option>
                        </Select>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xs={24} className="mb-[25px]">
              <PaginationStyle>
                <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
                  <div className="py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b ">
                    <Heading as="h4" className="mb-0 text-lg font-medium">
                      Account Table
                    </Heading>
                  </div>
                  <div className="p-[25px]">
                    <DataTable tableData={tableDataScource} columns={dataTableColumn} rowSelection={false} />
                  </div>
                </div>
              </PaginationStyle>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </>
  );
}

export default AccountTable;

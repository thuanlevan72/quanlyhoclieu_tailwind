import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Row, Col, Skeleton, Button, Pagination, Input } from 'antd';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
// import UilApps from '@iconscout/react-unicons/icons/uil-apps';
// import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
// import UilUsersAlt from '@iconscout/react-unicons/icons/uil-users-alt';
import { SearchOutlined } from '@ant-design/icons';
// import UilExpandArrowsAlt from '@iconscout/react-unicons/icons/uil-expand-arrows-alt';
import { Link, Routes, Route } from 'react-router-dom';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { PaginationStyle } from '../../styled';
import { AdminApi } from '../../../config/api/admin/AdminApi';

const Tutor = lazy(() => import('../overview/TutorCard'));
// const UserCardStyle = lazy(() => import('../pages/overview/UserCardStyle'));
// const UserCardList = lazy(() => import('../pages/overview/UserCardList'));
// const UserCardGroup = lazy(() => import('../pages/overview/UserCardGroup'));

function Tutors() {
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [users, setUsers] = useState([]);
  const [userslst, setUserslst] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setPagination({
          pageNumber: 1,
          pageSize: 8,
        });
        const res = await AdminApi.getTutor(pagination);
        setUsers(res.data.data);
        setUserslst(res.data.data);
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);

  const handleSearch = (searchText) => {
    if (searchText.length !== 0) {
      const data = users.filter((item) => item.fullName.toUpperCase().startsWith(searchText.toUpperCase()));
      setUserslst(data);
    } else {
      setUserslst([...users]);
    }
  };

  const GridView = React.memo(() => {
    return userslst.map((user) => {
      const { id } = user;

      return (
        <Col key={id} xxl={6} xl={8} sm={12} xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton avatar active />
              </Cards>
            }
          >
            <Tutor user={user} />
          </Suspense>
        </Col>
      );
    });
  });
  return (
    <>
      <PageHeader
        className="pt-[29px] px-[30px] pb-[31px] bg-[#f4f5f7] dark:bg-transparent flex items-start justify-between [&>div]:flex-1 [&>div]:flex [&>div]:items-center min-2xl:[&>div]:justify-between 2xl:[&>div]:flex-wrap xl:[&>div]:flex-col 2xl:[&>div]:gap-[15px] [&>div]:justify-center lg:[&>div]:flex-col [&>div>div>span+span]:mt-0 md:[&>div]:gap-[15px] lg:[&>div>div]:flex-warp lg:[&>div>div]:flex-col lg:[&>div>div]:flex-wrap lg:[&>div>div]:gap-[15px]"
        ghost
        title={
          <>
            <span className="text-[22px] font-semibold text-dark dark:text-white87 relative min-md:ltr:pr-[24px] min-md:ltr:mr-[24px] min-md:rtl:pl-[24px] min-md:rtl:ml-[24px] capitalize leading-[32px] after:absolute ltr:after:right-0 rtl:after:left-0 after:top-0 after:h-full after:w-[1px] after:content-[''] after:bg-normal dark:after:bg-white10 md:after:hidden">
              Tutor Manage
            </span>
          </>
        }
        subTitle={
          <div className="flex items-center font-medium text-theme-gray dark:text-white60 min-md:gap-[25px] gap-[15px]">
            <span className="title-counter">
              {users.length} Tutor{users.length > 1 ? 's' : ''}
            </span>
            <div className="flex items-center [&>div>div]:h-[46px] [&>.ant-select>.ant-select-selector>span>input]:!h-[46px] [&>div>div]:rounded-[20px] min-lg:[&>div>div]:w-[305px] [&>div>div]:bg-transparent [&>div>div]:border-none [&>div>div]:shadow-none bg-white dark:bg-white10 rounded-[20px]">
              <AutoComplete
                dropdownMatchSelectWidth={false}
                onSearch={handleSearch}
                // dataSource={notData}
                width="100%"
                placeholder="Search by Name"
              >
                <Input className="bg-transparent px-5 border border-regular dark:border-white10 shadow-none rounded-[100px] [&>input]:!bg-transparent dark:[&>input]:!bg-transparent h-[38px]" />
              </AutoComplete>
              <Button className="h-[46px] rounded-tl-none rounded-bl-none bg-transparent border-none shadow-none">
                <SearchOutlined className="flex text-light-extra dark:text-white87 [&>svg]:text-light-extra dark:[&>svg]:text-white87" />
              </Button>
            </div>
          </div>
        }
        buttons={[
          <div className="flex items-center flex-wrap gap-[20px] ssm:flex-col ssm:justify-center">
            <Button
              className="px-[14px] text-[14px] font-semibold text-sm rounded-md h-[40px] 
              bg-[#ffa502] text-white flex items-center 
              justify-center gap-[5px] shadow-none border-[#ffa502] outline-none hover:scale-105 transition-transform duration-300 transform"
              key="1"
            >
              <Link
                to="/admin/manage/tutor/add-tutor"
                className=" text-[14px] font-semibold text-sm  bg-[#ffa502] text-white flex items-center justify-center gap-[5px]"
              >
                <UilPlus className="w-[15px] h-[15px]" /> Add New Tutor
              </Link>
            </Button>
          </div>,
        ]}
      />
      <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent hexadash-calendar-wrap">
        <Row gutter={25}>
          <Routes>
            <Route path="/" element={<GridView />} />
          </Routes>

          <Col xs={24}>
            <PaginationStyle>
              <div className="ant-pagination-custom-style mb-[34px] min-md:text-end text-center">
                <Pagination showSizeChanger defaultCurrent={6} total={500} />
              </div>
            </PaginationStyle>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tutors;

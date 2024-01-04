import UilBook from '@iconscout/react-unicons/icons/uil-book-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import UilDeny from '@iconscout/react-unicons/icons/uil-angry';
import { Card, Col } from 'antd';
import Cookies from 'js-cookie';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StudentApi } from '../../config/api/student/StudentApi';

function CourseCard({ courseData }) {
  const authInfo = localStorage.getItem('authInfo');
  const authInfoObject = JSON.parse(authInfo);
  let path = '';
  const { courseID, courseName, cost } = courseData;
  const [avai, setAvai] = useState(false);
  const decentralization = Cookies.get('decentralization');
  useEffect(() => {
    async function fetchData() {
      try {
        if (authInfoObject.decentralization === 'Student') {
          const res = await StudentApi.getAssignmentByCourseId({ pageNumber: 1, pageSize: 1000000, id: courseID });
          if (res.data.data.length > 0) setAvai(true);
        }
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);
  if (authInfoObject.decentralization.toLowerCase() === 'student')
    path = `/${decentralization}/course/courseDetails/${courseID}`;
  if (authInfoObject.decentralization.toLowerCase() === 'admin') {
    path = `/${decentralization}/manage/course/courseDetails/${courseID}`;
  }
  if (authInfoObject.decentralization.toLowerCase() === 'tutor') {
    path = `/${decentralization}/assignment/assignmentDetails/${courseID}`;
  }
  if (authInfoObject.decentralization === 'Student') {
    return (
      <Col xxl={6} lg={8} sm={12} xs={24}>
        <Link className="mb-[25px] [&>.ant-card>.ant-card-body]:p-[18px]" to={avai === true ? path : '#'}>
          <Card
            bordered="false"
            className={`transition-transform duration-300 transform ${
              avai === true
                ? 'hover:bg-[#eccc68] my-[10px] hover:scale-105 hover:shadow-sm'
                : 'hover:bg-[#eccc68] my-[10px] hover:scale-105 hover:shadow-sm hover:cursor-not-allowed'
            }`}
          >
            <div className="mb-[15px] rounded-[10px]">
              <img className="3xl:w-full" src={require(`../../static/img/courses/1.png`)} alt="hexadash" />
            </div>
            <div>
              <h4 className="mb-3 text-xl font-semibold 3xl:text-lg">
                <div className="text-dark hover:text-[#ff6348] dark:text-white87 dark:hover:text-[#ffa502]">
                  {courseName}
                </div>
              </h4>
              <div className="flex items-center gap-2.5 mb-5">
                {avai === true ? <UilCheck className="text-green-500" /> : <UilDeny className="text-red-500" />}
                <span className="text-[15px] text-light dark:text-white60">
                  {avai === true ? 'Available' : 'Non-Available'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-[10px]">
                <div>
                  <span className="mb-3 text-xl font-semibold text-success 3xl:text-lg">
                    {cost.toLocaleString('en-US')} VND
                  </span>
                </div>
                <ul className="flex items-center gap-2.5 2xl:gap-[5px] mb-0">
                  <li className="inline-flex items-center gap-[3px] bg-secondary-transparent text-secondary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                    <UilBook className="w-[14px]" />
                    <span className="text-[13px] 3xl:text-xs font-medium leading-none">15 Lectures</span>
                  </li>
                  <li className="inline-flex items-center gap-[3px] bg-[#fb358626] text-body h-8 px-5 3xl:px-2.5 rounded-[20px]">
                    <UilClock className="w-[14px]" />
                    <span className="text-[13px] 3xl:text-xs font-medium leading-none">60 Hrs</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </Link>
      </Col>
    );
  }
  return (
    <Col xxl={6} lg={8} sm={12} xs={24}>
      <Link className="mb-[25px] [&>.ant-card>.ant-card-body]:p-[18px]" to={path}>
        <Card
          bordered="false"
          className="transition-transform duration-300 transform hover:bg-[#eccc68] my-[10px] hover:scale-105 hover:shadow-sm"
        >
          <div className="mb-[15px] rounded-[10px]">
            <img className="3xl:w-full" src={require(`../../static/img/courses/1.png`)} alt="hexadash" />
          </div>
          <div>
            <h4 className="mb-3 text-xl font-semibold 3xl:text-lg">
              <div className="text-dark hover:text-[#ff6348] dark:text-white87 dark:hover:text-[#ffa502]">
                {courseName}
              </div>
            </h4>
            <div className="flex items-center gap-2.5 mb-5">
              {avai === true ? <UilCheck className="text-green-500" /> : <UilDeny className="text-red-500" />}
              <span className="text-[15px] text-light dark:text-white60">
                {avai === true ? 'Available' : 'Non-Available'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-[10px]">
              <div>
                <span className="mb-3 text-xl font-semibold text-success 3xl:text-lg">
                  {cost.toLocaleString('en-US')} VND
                </span>
              </div>
              <ul className="flex items-center gap-2.5 2xl:gap-[5px] mb-0">
                <li className="inline-flex items-center gap-[3px] bg-secondary-transparent text-secondary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                  <UilBook className="w-[14px]" />
                  <span className="text-[13px] 3xl:text-xs font-medium leading-none">15 Lectures</span>
                </li>
                <li className="inline-flex items-center gap-[3px] bg-[#fb358626] text-primary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                  <UilClock className="w-[14px]" />
                  <span className="text-[13px] 3xl:text-xs font-medium leading-none">60 Hrs</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </Link>
    </Col>
  );
}

CourseCard.propTypes = {
  courseData: propTypes.object,
};

export default CourseCard;

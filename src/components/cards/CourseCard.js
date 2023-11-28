import UilBook from '@iconscout/react-unicons/icons/uil-book-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import { Card, Col } from 'antd';
import Cookies from 'js-cookie';
import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ courseData }) {
  const { id, thumbnail, title, author, authorImg, price, duration, lectures } = courseData;
  const decentralization = Cookies.get('decentralization');
  return (
    <Col xxl={6} lg={8} sm={12} xs={24}>
      <Link
        className="mb-[25px] [&>.ant-card>.ant-card-body]:p-[18px]"
        to={`/${decentralization}/course/courseDetails/${id}`}
      >
        <Card bordered="false">
          <div className="mb-[15px] rounded-[10px]">
            <img className="3xl:w-full" src={require(`../../static/img/courses/${thumbnail}`)} alt="hexadash" />
          </div>
          <div>
            <h4 className="mb-3 text-xl font-semibold 3xl:text-lg">
              <div className="text-dark hover:text-secondary dark:text-white87 dark:hover:text-secondary">{title}</div>
            </h4>
            <div className="flex items-center gap-2.5 mb-5">
              <img className="w-[30px]" src={require(`../../static/img/avatar/${authorImg}`)} alt="hexadash" />
              <span className="text-[15px] text-light dark:text-white60">{author}</span>
            </div>
            <div className="flex items-center justify-between gap-[10px]">
              <div>
                <span className="mb-3 text-xl font-semibold text-success 3xl:text-lg">${price}</span>
              </div>
              <ul className="flex items-center gap-2.5 2xl:gap-[5px] mb-0">
                <li className="inline-flex items-center gap-[3px] bg-secondary-transparent text-secondary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                  <UilBook className="w-[14px]" />
                  <span className="text-[13px] 3xl:text-xs font-medium leading-none">{lectures} Lectures</span>
                </li>
                <li className="inline-flex items-center gap-[3px] bg-[#fb358626] text-primary h-8 px-5 3xl:px-2.5 rounded-[20px]">
                  <UilClock className="w-[14px]" />
                  <span className="text-[13px] 3xl:text-xs font-medium leading-none">{duration} Hrs</span>
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

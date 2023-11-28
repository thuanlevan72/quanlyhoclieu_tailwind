import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TopMenuStyle } from './Style';

function TopMenu() {
  const path = '/student';
  const location = useLocation();
  const currentPath = location.pathname;

  // Sử dụng substring để lấy phần con đường dẫn
  const subPath = currentPath.substring(currentPath.indexOf('/', 1));

  const activeLink = (value) => {
    return value === subPath ? 'parent active' : 'parent';
  };
  return (
    <TopMenuStyle>
      <div className="hexadash-top-menu ltr:pl-[20px] rtl:pr-[20px] xl:ltr:pl-[10px] xl:rtl:pr-[10px]">
        <ul>
          <li className="">
            <Link to={`${path}/course`} className={activeLink('/course')}>
              Course
            </Link>
          </li>
          <li className="">
            <Link to={`${path}/yourCourses`} className={activeLink('/yourCourses')}>
              Your Courses
            </Link>
          </li>
          <li className="">
            <Link to={`${path}/student-fee`} className={activeLink('/student-fee')}>
              Fees
            </Link>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;

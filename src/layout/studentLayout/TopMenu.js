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
    return value === subPath ? 'text-[#ffa502] active' : 'parent';
  };
  return (
    <TopMenuStyle>
      <div className="hexadash-top-menu ltr:pl-[20px] rtl:pr-[20px] xl:ltr:pl-[10px] xl:rtl:pr-[10px]">
        <ul>
          <li className="">
            <Link to={`${path}/course`} className={`${activeLink('/course')} hover:text-[#ffa502]`}>
              Course
            </Link>
          </li>
          <li className="">
            <Link to={`${path}/yourCourses`} className={`${activeLink('/yourCourses')} hover:text-[#ffa502]`}>
              Your Courses
            </Link>
          </li>
          <li className="">
            <Link to={`${path}/student-fee`} className={`${activeLink('/student-fee')} hover:text-[#ffa502]`}>
              Fees
            </Link>
          </li>
          <li className="">
            <Link to={`${path}/blog`} className={`${activeLink('/blog')} hover:text-[#ffa502]`}>
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;

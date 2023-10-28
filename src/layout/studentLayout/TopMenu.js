import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { TopMenuStyle } from './Style';

function TopMenu() {
  const path = '/student';
  const location = useLocation();
  const currentPath = location.pathname;

  // Sử dụng substring để lấy phần con đường dẫn
  const subPath = currentPath.substring(currentPath.indexOf('/', 1));
  console.log(subPath);

  const activeLink = (value) => {
    console.log(value);
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
          <li className="has-subMenu">
            <Link to="#" className="parent">
              Courseware
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/courseWave/lectures`} className={activeLink('/courseWave/lectures')}>
                  Lecture
                </NavLink>
              </li>
              <li>
                <NavLink to={`${path}/courseWave/materials`} className={activeLink('/courseWave/materials')}>
                  Material
                </NavLink>
              </li>
              <li>
                <NavLink to={`${path}/courseWave/submissions`} className={activeLink('/courseWave/submissions')}>
                  Submission
                </NavLink>
              </li>
              <li>
                <NavLink to={`${path}/courseWave/assignments`} className={activeLink('/student-assignment')}>
                  Asignment
                </NavLink>
              </li>
            </ul>
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

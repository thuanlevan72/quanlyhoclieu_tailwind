import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
          <li className="">
            <Link to={`${path}/student-assignment`} className={activeLink('/student-assignment')}>
              Asignments
            </Link>
          </li>

          <li className="">
            <Link to={`${path}/student-fee`} className={activeLink('/student-fee')}>
              Fees
            </Link>
          </li>

          {/* <li className="has-subMenu">
            <Link to={`${path}/student-dashboard`} className={activeLink('/student-dashboard')}>
              Create Feedback
            </Link>
          </li>
          <li className="has-subMenu">
            <Link to={`${path}/student-dashboard`} className={activeLink('/student-fee')}>
              Lectures
            </Link>
          </li>
          <li className="has-subMenu">
            <Link to={`${path}/student-dashboard`} className={activeLink('/student-fee')}>
              Materials
            </Link>
          </li> */}
          <li className="">
            <Link to={`${path}/payment-history`} className={activeLink('/payment-history')}>
              Payment History
            </Link>
          </li>
          {/* <li className="has-subMenu">
            <Link to={`${path}/student-dashboard`} className="parent" onClick={addParentActive}>
              Submission
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/student-dashboard`} onClick={addParentActive}>
                  Submission
                </NavLink>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;

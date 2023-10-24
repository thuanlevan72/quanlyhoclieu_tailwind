import React, { useLayoutEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TopMenuStyle } from './Style';

function TopMenu() {
  const path = '/student';

  useLayoutEffect(() => {
    const active = document.querySelector('.hexadash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const addParentActive = (event) => {
    document.querySelectorAll('.parent').forEach((element) => {
      element.classList.remove('active');
    });

    const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
    const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
    if (!megaMenu) {
      event.currentTarget.closest('ul').previousSibling.classList.add('active');
      if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
    } else {
      event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
    }
  };
  return (
    <TopMenuStyle>
      <div className="hexadash-top-menu ltr:pl-[20px] rtl:pr-[20px] xl:ltr:pl-[10px] xl:rtl:pr-[10px]">
        <ul>
          <li className="has-subMenu">
            <Link to={`${path}/course`} className="parent" onClick={addParentActive}>
              Course
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/course`} onClick={addParentActive}>
                  Course
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subMenu">
            <Link to={`${path}/student-assignment`} className="parent" onClick={addParentActive}>
              Asignments
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/student-assignment`} onClick={addParentActive}>
                  Asignment
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to={`${path}/student-fee`} className="parent" onClick={addParentActive}>
              Fees
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/student-fee`} onClick={addParentActive}>
                  Fees
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to={`${path}/student-dashboard`} className="parent" onClick={addParentActive}>
              Create Feedback
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/student-dashboard`} onClick={addParentActive}>
                  Create Feedback
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subMenu">
            <Link to={`${path}/student-dashboard`} className="parent" onClick={addParentActive}>
              Lectures
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/student-dashboard`} onClick={addParentActive}>
                  Lectures
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subMenu">
            <Link to={`${path}/student-dashboard`} className="parent" onClick={addParentActive}>
              Materials
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/student-dashboard`} onClick={addParentActive}>
                  Materials
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subMenu">
            <Link to={`${path}/payment-history`} className="parent" onClick={addParentActive}>
              Payment History
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/payment-history`} onClick={addParentActive}>
                  Payment History
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subMenu">
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
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;

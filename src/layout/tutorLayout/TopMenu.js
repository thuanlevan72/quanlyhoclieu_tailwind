import React, { useLayoutEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TopMenuStyle } from './Style';

function TopMenu() {
  const path = '/tutor';

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
            <Link to="#" className="parent">
              Set Of Questions
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to="#" onClick={addParentActive}>
                  Questions
                </NavLink>
              </li>
              <li>
                <NavLink to="#" onClick={addParentActive}>
                  Answers
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="has-subMenu">
            <Link to="#" className="parent" onClick={addParentActive}>
              Assignment
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/course`} onClick={addParentActive}>
                  Course
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="mega-item has-subMenu">
            <Link to="#" className="parent" onClick={addParentActive}>
              Lectures
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/course`} onClick={addParentActive}>
                  Course
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="mega-item has-subMenu">
            <Link to="#" className="parent" onClick={addParentActive}>
              Materials
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
            <Link to="#" className="parent" onClick={addParentActive}>
              Submissions
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
            <Link to="#" className="parent" onClick={addParentActive}>
              TutorAssignment
            </Link>
            <ul className="subMenu">
              <li>
                <NavLink to={`${path}/course`} onClick={addParentActive}>
                  Course
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

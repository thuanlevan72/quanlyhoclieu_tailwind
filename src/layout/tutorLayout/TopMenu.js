import React, { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TopMenuStyle } from './Style';

function TopMenu() {
  const path = '/tutor';
  const location = useLocation();
  const currentPath = location.pathname;

  // Sử dụng substring để lấy phần con đường dẫn
  const subPath = currentPath.substring(currentPath.indexOf('/', 1));
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
  const activeLink = (value) => {
    return value === subPath ? 'text-[#ffa502] active' : 'parent';
  };
  return (
    <TopMenuStyle>
      <div className="hexadash-top-menu ltr:pl-[20px] rtl:pr-[20px] xl:ltr:pl-[10px] xl:rtl:pr-[10px]">
        <ul>
          <li className="">
            <Link to={`${path}/assignment`} className={`${activeLink('/assignment')} hover:text-[#ffa502]`}>
              Assignment
            </Link>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;

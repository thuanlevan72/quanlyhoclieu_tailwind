import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { Upload } from 'antd';
import Cookies from 'js-cookie';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import UilSetting from '@iconscout/react-unicons/icons/uil-setting';
import UilBell from '@iconscout/react-unicons/icons/uil-bell';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilUsersAlt from '@iconscout/react-unicons/icons/uil-users-alt';
import { Link, NavLink } from 'react-router-dom';
import Heading from '../../../../components/heading/heading';

function AuthorBox() {
  const { authInfo } = useSelector((state) => {
    return {
      authInfo: state.auth.authInfo,
    };
  });
  const decentralization = `/${Cookies.get('decentralization')}/profile`;
  const [activeValue, setActiveValue] = useState('profile');

  return (
    <>
      <div className="bg-white dark:bg-white10 rounded-[10px]">
        <div className="-mx-3 px-5 pt-[25px] pb-5 text-center border-b border-regular dark:border-white10">
          <figure className="relative max-w-[120px] mx-auto mb-6">
            <img className="mx-auto max-w-[120px]" src={authInfo.avatar} alt="" />
            <Upload className="absolute right-0 flex items-center justify-center w-10 h-10 bg-white rounded-full -bottom-2 dark:bg-white10">
              <Link to="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                <UilCamera className="w-4 h-4 text-white" />
              </Link>
            </Upload>
          </figure>
          <figcaption>
            <Heading as="h4" className="mb-0 text-lg font-semibold text-dark dark:text-white87">
              {authInfo.lastName}
            </Heading>
          </figcaption>
        </div>
        <nav className="px-[25px] pt-8 pb-5">
          <ul className="mb-0">
            <li>
              <NavLink
                to={`${decentralization}/profile`}
                onClick={() => {
                  setActiveValue('profile');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  activeValue === 'profile'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Edit Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${decentralization}/account`}
                onClick={() => {
                  setActiveValue('account');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  activeValue === 'account'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <UilSetting className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Account Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${decentralization}/password`}
                onClick={() => {
                  setActiveValue('password');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  activeValue === 'password'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ltr:mr-3 rtl:ml-3 -mb-0.5 feather feather-key"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${decentralization}/social`}
                onClick={() => {
                  setActiveValue('social');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  activeValue === 'social'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <UilUsersAlt className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Social Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${decentralization}/notification`}
                onClick={() => {
                  setActiveValue('notification');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  activeValue === 'notification'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <UilBell className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Notification
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to={`${decentralization}/payment`}
                onClick={() => {
                  setActiveValue('payment');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  activeValue === 'payment'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <UilBell className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Payment
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default AuthorBox;

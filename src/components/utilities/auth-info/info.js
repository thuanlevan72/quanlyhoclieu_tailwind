import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilBell from '@iconscout/react-unicons/icons/uil-bell';
import UilDollarSign from '@iconscout/react-unicons/icons/uil-dollar-sign';
import UilSetting from '@iconscout/react-unicons/icons/uil-setting';
import UilSignout from '@iconscout/react-unicons/icons/uil-signout';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilHistory from '@iconscout/react-unicons/icons/uil-history';
import UilUsersAlt from '@iconscout/react-unicons/icons/uil-users-alt';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Search from './Search';
import Message from './Message';
import Notification from './Notification';
import Settings from './settings';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';
import { Dropdown } from '../../dropdown/dropdown';
import { logOut } from '../../../redux/authentication/actionCreator';
import { StudentApi } from '../../../config/api/student/StudentApi';

const AuthInfo = React.memo(() => {
  const { authInfo } = useSelector((state) => {
    return {
      authInfo: state.auth.authInfo,
    };
  });
  const decentralization = Cookies.get('decentralization');
  const dispatch = useDispatch();
  const [state, setState] = useState({
    flag: 'en',
  });
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { flag } = state;

  const SignOut = (e) => {
    e.preventDefault();
    dispatch(logOut(() => navigate('/')));
  };
  const [totalMoney, setTotalMoney] = useState(authInfo.totalMoney);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await StudentApi.getTotalMoney();
        setTotalMoney(res.data);
      } catch (error) {
        return 'error';
      }
    }
    fetchData();
  }, [totalMoney]);
  const formattedCurrency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(totalMoney);
  const userContent = (
    <div>
      <div className="min-w-[280px] sm:min-w-full pt-4">
        <figure className="flex items-center text-sm rounded-[8px] bg-section dark:bg-white10 py-[20px] px-[25px] mb-[12px]">
          <img className="ltr:mr-4 rtl:ml-4 max-w-[100px] rounded-xl" src={authInfo.avatar} alt="" />
          <figcaption>
            <Heading className="text-dark dark:text-white87 mb-0.5 text-sm" as="h5">
              {authInfo.lastName}
            </Heading>
            <p className="mb-0 text-xs text-body dark:text-white60">Cựu trẻ em</p>
          </figcaption>
        </figure>
        <ul className="mb-0">
          <li>
            <Link
              to={`/${decentralization}/profile`}
              className="inline-flex items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Profile
            </Link>
          </li>
          <li>
            <Link
              to={`/${decentralization}/settings`}
              className="inline-flex items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilSetting className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Settings
            </Link>
          </li>
          <li>
            <Link
              to={`/${decentralization}/total-money`}
              className="inline-flex items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilDollarSign className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Total Money: {formattedCurrency}
            </Link>
          </li>
          <li>
            <Link
              to={`/${decentralization}/payment-history`}
              className="inline-flex items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilHistory className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Payment History
            </Link>
          </li>
          <li>
            <Link
              to={`/${decentralization}/activity`}
              className="inline-flex items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilUsersAlt className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Activity
            </Link>
          </li>
          <li>
            <Link
              to={`/${decentralization}/help`}
              className="inline-flex items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilBell className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Help
            </Link>
          </li>
        </ul>
        <Link
          to="#"
          onClick={SignOut}
          className="flex items-center justify-center text-sm font-medium bg-[#f4f5f7] dark:bg-[#32333f] h-[50px] text-light hover:text-primary dark:hover:text-white60 dark:text-white87 mx-[-15px] mb-[-15px] rounded-b-6"
        >
          <UilSignout className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Sign Out
        </Link>
      </div>
    </div>
  );

  const onFlagChangeHandle = (value, e) => {
    e.preventDefault();
    setState({
      ...state,
      flag: value,
    });
    i18n.changeLanguage(value);
  };

  const country = (
    <div className="block bg-white dark:bg-[#1b1d2a]">
      <Link
        to="#"
        onClick={(e) => onFlagChangeHandle('en', e)}
        className="flex items-center bg-white dark:bg-white10 hover:bg-primary-transparent px-3 py-1.5 text-sm text-dark dark:text-white60"
      >
        <img className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" src={require('../../../static/img/flag/en.png')} alt="" />
        <span>English</span>
      </Link>
      <Link
        to="#"
        onClick={(e) => onFlagChangeHandle('esp', e)}
        className="flex items-center bg-white dark:bg-white10 hover:bg-primary-transparent px-3 py-1.5 text-sm text-dark dark:text-white60"
      >
        <img className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" src={require('../../../static/img/flag/esp.png')} alt="" />
        <span>Spanish</span>
      </Link>
      <Link
        to="#"
        onClick={(e) => onFlagChangeHandle('en', e)}
        className="flex items-center bg-white dark:bg-white10 hover:bg-primary-transparent px-3 py-1.5 text-sm text-dark dark:text-white60"
      >
        <img className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" src={require('../../../static/img/flag/ar.png')} alt="" />
        <span>Arabic</span>
      </Link>
      <Link
        to="#"
        onClick={(e) => onFlagChangeHandle('vn', e)}
        className="flex items-center bg-white dark:bg-white10 hover:bg-primary-transparent px-3 py-1.5 text-sm text-dark dark:text-white60"
      >
        <img className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" src={require('../../../static/img/flag/ar.png')} alt="" />
        <span>VietNam</span>
      </Link>
    </div>
  );

  return (
    <div className="flex items-center justify-end flex-auto">
      <div className="md:hidden">
        <Search />
      </div>
      <Message />
      <Notification />
      <Settings />
      <div className="flex mx-3">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="flex">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div>
      <div className="flex ltr:ml-3 rtl:mr-3 ltr:mr-4 rtl:ml-4 ssm:mr-0 ssm:rtl:ml-0">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="flex items-center text-light whitespace-nowrap">
            <Avatar src={authInfo.avatar} />
            <span className="ltr:mr-1.5 rtl:ml-1.5 ltr:ml-2.5 rtl:mr-2.5 text-body dark:text-white60 text-sm font-medium md:hidden">
              {authInfo.lastName}
            </span>
            <UilAngleDown className="w-4 h-4 ltr:md:ml-[5px] rtl:md:mr-[5px]" />
          </Link>
        </Popover>
      </div>
    </div>
  );
});

export default AuthInfo;

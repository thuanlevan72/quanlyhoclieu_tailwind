import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { ReactSVG } from 'react-svg';
import UilBookOpen from '@iconscout/react-unicons/icons/uil-book-open';
import UilFile from '@iconscout/react-unicons/icons/uil-file';
import UilFileAlt from '@iconscout/react-unicons/icons/uil-file-alt';
import UilPrint from '@iconscout/react-unicons/icons/uil-print';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
// import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f';
// import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
// import GoogleIcon from '../../../../static/img/icon/google-customIcon.svg';
import config from '../../../../config/config';
import { GlobalUtilityStyle } from '../../../styled';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DashboardChart from '../../../../components/charts/DashboardChart';
import { AdminApi } from '../../../../config/api/admin/AdminApi';

const SourceRevenueGenerated = React.memo(() => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await AdminApi.getCoursePercentage();
        setDatas(res.data);
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);
  const { mainContent } = useSelector((state) => {
    return {
      mainContent: state.ChangeLayoutMode.mode,
    };
  });
  const lableval = [];
  const dataval = [];
  if (datas !== null) {
    datas.map((data) => {
      lableval.push(data.courseName);
      dataval.push(data.percentage.toFixed(2));
      return null;
    });
  }
  const { theme } = config;
  const chartHeight = window.innerWidth <= 1699 ? (window.innerWidth <= 991 ? 200 : 200) : 300;
  const chartWidth = window.innerWidth <= 1699 ? (window.innerWidth <= 991 ? 200 : 200) : 300;
  const chartjsPieChart = {
    height: chartHeight,
    width: chartWidth,
    labels: lableval,
    datasets: [
      {
        data: dataval,
        backgroundColor: [
          '#eccc68',
          '#7bed9f',
          '#ff7f50',
          '#70a1ff',
          '#ff6b81',
          '#a4b0be',
          '#ffa502',
          '#2ed573',
          '#ff6348',
          '#1e90ff',
          '#ff4757',
          '#3742fa',
          '#747d8c',
        ],
      },
    ],
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },

    option: {
      borderColor: theme[mainContent]['white-background'],
      maintainAspectRatio: true,
      responsive: false,
    },

    tooltip: {
      mode: 'index',
      callbacks: {
        label(t) {
          const { dataset, label, dataIndex } = t;
          return `  ${label} ${dataset.data[dataIndex]}`;
        },
        labelColor({ dataIndex, dataset }) {
          return {
            backgroundColor: dataset.backgroundColor[dataIndex],
            borderColor: 'transparent',
            color: '#0a0a0a',
          };
        },
      },
    },
  };

  const moreContent = (
    <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4">
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilPrint className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Printer</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilBookOpen className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>PDF</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilFileAlt className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Google Sheets</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilTimes className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Excel (XLSX)</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilFile className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>CSV</span>
      </NavLink>
    </div>
  );

  return (
    <GlobalUtilityStyle className="h-full">
      <Cards
        title="Source Of Revenue Generated"
        size="large"
        className={`mb-[25px] border-none h-full ant-card-body-p-25 ant-card-head-px-25 
        ant-card-head-b-none ant-card-body-pt-0 ant-card-body-pb-0 ant-card-head-title-base`}
        more={moreContent}
      >
        <div className="hexadash-chart-container flex items-center justify-between flex-wrap gap-y-[20px] py-[20px] sm:pt-0 px-[25px] 3xl:justify-center lg:justify-start md:justify-center gap-x-[20px] [&>.chartjs-tooltip>table>tbody>tr>td]:text-dark dark:[&>.chartjs-tooltip>table>tbody>tr>td]:text-white60">
          <DashboardChart {...chartjsPieChart} type="pie" id="pieChart" />
          <div className="flex flex-wrap gap-x-[44px] gap-y-[22px] ssm:gap-x-[15px] ssm:gap-y-[15px] ssm:justify-center mt-[30px]">
            {lableval !== null ? (
              lableval.map((value, index) => (
                <div key={index}>
                  <div className="text-center">
                    <div
                      className="w-[50px] h-[10px]"
                      style={{ backgroundColor: `${chartjsPieChart.datasets[0].backgroundColor[index % 12]}` }}
                    >
                      {' '}
                    </div>
                    <div
                      className={`text-[15px] dark:text-white87 block font-medium text-[${chartjsPieChart.datasets[0].backgroundColor[index]}]`}
                    >
                      {chartjsPieChart.labels[index]}
                    </div>
                    <span className="text-[14px] text-light dark:text-white60 block font-medium">
                      {chartjsPieChart.datasets[0].data[index]}%
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>null</div>
            )}
          </div>
        </div>
      </Cards>
    </GlobalUtilityStyle>
  );
});

export default SourceRevenueGenerated;

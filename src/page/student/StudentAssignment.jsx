import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash';
import DataTable from '../../components/table/DataTable';

const tableDataScource = [];
function Student() {
  const { TableData } = useSelector((states) => {
    return {
      TableData: states.dataTable.tableData,
    };
  });

  if (TableData.length > 0) {
    TableData.map((item) => {
      const { id, name, country, company, position, status, date } = item;
      return tableDataScource.push({
        id: <span className="text-body dark:text-white60 text-[15px] font-medium">{`#${id}`}</span>,
        user: <span className="text-body dark:text-white60 text-[15px] font-medium">{name}</span>,
        country: <span className="text-body dark:text-white60 text-[15px] font-medium">{country}</span>,
        company: <span className="text-body dark:text-white60 text-[15px] font-medium">{company}</span>,
        position: <span className="text-body dark:text-white60 text-[15px] font-medium">{position}</span>,
        date: <span className="text-body dark:text-white60 text-[15px] font-medium">{date}</span>,
        status: (
          <span
            className={`inline-flex items-center justify-center bg-${status}-transparent text-${status} min-h-[24px] px-3 text-xs font-medium rounded-[15px]`}
          >
            {status}
          </span>
        ),
        action: (
          <div className="min-w-[150px] text-end -m-2">
            <Link className="inline-block m-2" to="#">
              <UilEye className="w-4 text-light-extra dark:text-white60" />
            </Link>
            <Link className="inline-block m-2" to="#">
              <UilEdit className="w-4 text-light-extra dark:text-white60" />
            </Link>
            <Link className="inline-block m-2" to="#">
              <UilTrash className="w-4 text-light-extra dark:text-white60" />
            </Link>
          </div>
        ),
      });
    });
  }
  const dataTableColumn = [
    {
      title: 'AssignmentID',
      dataIndex: 'AssignmentID',
      key: 'AssignmentID',
    },
    {
      title: 'CourseID',
      dataIndex: 'CourseID',
      key: 'CourseID',
    },
    {
      title: 'ExamTypeID',
      dataIndex: 'ExamTypeID',
      key: 'ExamTypeID',
    },
    {
      title: 'AssignmentName',
      dataIndex: 'AssignmentName',
      key: 'AssignmentName',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'WorkTime',
      dataIndex: 'WorkTime',
      key: 'WorkTime',
    },
    {
      title: 'DueDate',
      dataIndex: 'DueDate',
      key: 'DueDate',
    },
    {
      title: 'MinGrade',
      dataIndex: 'MinGrade',
      key: 'MinGrade',
      width: '90px',
    },
  ];
  console.log(tableDataScource);
  return (
    <main className="min-h-[715px] lg:min-h-[580px]">
      <div className="min-h-screen pb-36 px-[15px] text-center">
        {/* <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} /> */}
        <DataTable filterOption filterOnchange tableData={tableDataScource} columns={dataTableColumn} rowSelection />
      </div>
      {/* {state.isLoading ? (
        <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
          <Spin />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col min-h-screen pb-36 px-[15px] text-center">
          <img className="mx-auto mb-20" src={require(`../../static/img/pages/404.svg`).default} alt="404" />
          <Heading
            className="text-light-extra dark:text-white60 mb-5 text-6xl ssm:text-5xl xs:text-4xl font-semibold"
            as="h3"
          >
            404
          </Heading>
          <p className="text-body dark:text-white60 mb-6 text-lg xs:text-base font-medium">
            Sorry! the page you are looking for does not exist.
          </p>
          <NavLink to="/admin">
            <Button size="default" type="primary" to="/admin" className="h-11">
              Return Home
            </Button>
          </NavLink>
        </div>
      )} */}
    </main>
  );
}

export default Student;

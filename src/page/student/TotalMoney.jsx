import { PageHeader } from 'antd';

const PageRoutes = [
  {
    path: 'student',
    breadcrumbName: 'Home',
  },
  {
    path: 'course',
    breadcrumbName: 'Total Money',
  },
];

function TotalMoney() {
  return (
    <>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Total Money"
        routes={PageRoutes}
      />
    </>
  );
}
export default TotalMoney;

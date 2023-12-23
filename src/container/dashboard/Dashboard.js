import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';

const OverviewDataList = lazy(() => import('./overview/demoTwo/OverviewDataList'));
// const SaleRevenue = lazy(() => import('./overview/demoTwo/SaleRevenue'));
const NewCourse = lazy(() => import('./NewCourse'));
const SourceRevenueGenerated = lazy(() => import('./overview/demoTwo/SourceRevenueGenerated'));
// const BestSeller = lazy(() => import('./overview/demoTwo/BestSeller'));

function Dashboard() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
  ];
  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Dashboard"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />

      <main className="min-h-[715px] lg:min-h-[580px] flex-1 px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row justify="center">
          <Col xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <OverviewDataList />
            </Suspense>
          </Col>
        </Row>

        <Row justify="center" gutter={25}>
          <Col xxl={12} xs={24} className="mb-[25px]">
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <NewCourse />
            </Suspense>
          </Col>
          <Col xxl={12} xs={24} className="mb-[25px]">
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SourceRevenueGenerated />
            </Suspense>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Dashboard;

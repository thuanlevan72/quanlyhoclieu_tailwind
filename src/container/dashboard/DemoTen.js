import React, { Suspense, lazy } from 'react';
import { Row, Col, Skeleton, Slider } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import BlogCard from '../../components/cards/BlogCard';
import cardData from '../../demoData/sampleCards.json';

const UpcomingEvents = lazy(() => import('./overview/demoFive/UpcomingEvents'));
const KnowledgeBase = lazy(() => import('./overview/demoFive/KnowledgeBase'));
const Timelines = lazy(() => import('./overview/demoFive/Timeline'));
const Inbox = lazy(() => import('./overview/demoFive/Inbox'));

const { BlogCardData } = cardData;
function DemoFive() {
  return (
    <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent mt-[40px]">
      <Row gutter={25}>
        <Col xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            {/* <PageHeaderBanner
              title="Welcome To LD Academy"
              subtitle="
              Knowledge is all you need, come to us."
            /> */}
            <Slider />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <UpcomingEvents />
          </Suspense>
        </Col>
        <Col xxl={12} xl={12} lg={12} xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <KnowledgeBase />
          </Suspense>
        </Col>
        <Col xxl={12} xl={12} lg={12} xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <Timelines />
          </Suspense>
        </Col>
        <Col xxl={12} xl={12} xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <Inbox />
          </Suspense>
        </Col>
        {BlogCardData.slice(0, 3).map((blog, index) => {
          return (
            index <= 3 && (
              <Col key={blog.id} xxl={8} sm={12} xs={24} className="mb-[25px]">
                <BlogCard item={blog} />
              </Col>
            )
          );
        })}
      </Row>
    </div>
  );
}

export default DemoFive;

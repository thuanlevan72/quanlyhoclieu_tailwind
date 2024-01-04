import React, { Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import Feedback from './overview/demoFive/Feedback';
import UpcomingEvents from './overview/demoFive/UpcomingEvents';
import IntroductionUs from './overview/demoFive/IntroductionUs';
import KnowledgeBase from './overview/demoFive/KnowledgeBase';
import { Cards } from '../../components/cards/frame/cards-frame';
import BlogCard from '../../components/cards/BlogCard';
//  import { PageHeaderBanner } from '../../components/banners/Banners';

import cardData from '../../demoData/sampleCards.json';
import CollapseComponent from '../../components/collapse/collapseComponent';
// import CarouselComponent from '../../components/carousel/carouselComponent';
import { PageHeaderBanner } from '../../components/banners/Banners';

// const UpcomingEvents = lazy(() => import('./overview/demoFive/UpcomingEvents'));
// const KnowledgeBase = lazy(() => import('./overview/demoFive/KnowledgeBase'));
// const Timelines = lazy(() => import('./overview/demoFive/Timeline'));
// const Inbox = lazy(() => import('./overview/demoFive/Inbox'));

const { BlogCardData } = cardData;
function DemoFive() {
  return (
    <div
      className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent mt-[40px] 
    flex justify-center"
    >
      <Row gutter={25} className="w-[95%]">
        <Col xs={24} className="mb-[60px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <PageHeaderBanner
              title="Welcome To LD Academy"
              subtitle="
              Knowledge is all you need, come to us."
            />
          </Suspense>
        </Col>
        <Col xs={24} lg={12} className="mb-[60px]">
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
        <Col xs={24} lg={12} className="mb-[60px]">
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
        <Col xl={12} lg={24} xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <IntroductionUs />
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
            <CollapseComponent />
          </Suspense>
        </Col>
        <Col xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            {/* <Timelines /> */}
            <Feedback />
          </Suspense>
        </Col>
        {/* <Col xxl={12} xl={12} xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <Inbox />
          </Suspense>
        </Col> */}
        <Col xs={24} className="mb-[25px]">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <h1 className="text-4xl font-bold text-center text-[#ffa502] mt-[80px]">Posts</h1>
          </Suspense>
        </Col>
        {BlogCardData.slice(0, 8).map((blog, index) => {
          return (
            index <= 8 && (
              <Col key={blog.id} xs={6} className="mb-[25px]">
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

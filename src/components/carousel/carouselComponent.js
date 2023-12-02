import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const contentStyle = {
  height: '500px',
  textAlign: 'center',
  borderRadius: '10px',
  lineHeight: '300px',
  backgroundSize: 'cover', // Đảm bảo kích thước ảnh phù hợp với kích thước của phần nền
};

const carouselStyle = {
  overflow: 'hidden',
  borderRadius: '10px',
};

function CarouselComponent() {
  const carouselRef = useRef(null);

  const slides = [
    {
      id: 1,
      image:
        'https://media.geeksforgeeks.org/wp-content/uploads/20230929165105/JavaScript-Courses-&-Certifications.png',
    },
    {
      id: 2,
      image: 'https://itsharks.co/images/demo/course/c-hash.jpg',
    },
    {
      id: 3,
      image: 'https://149611589.v2.pressablecdn.com/wp-content/uploads/2016/09/reactjs.png',
    },
  ];

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <Carousel style={carouselStyle} autoplay autoplaySpeed={2000} easing="ease" ref={carouselRef}>
      {slides.map((slide) => (
        <div key={slide.id} style={{ contentStyle, backgroundImage: `url(${slide.image})` }}>
          {/* Nội dung của slide */}

          <div className="relative">
            <Button
              onClick={handlePrev}
              className="bottom-[50%] left-0 absolute active text-white text-[13px] font-semibold bg-transparent hover:border-primary px-[8px]  inline-flex items-center"
            >
              <LeftOutlined className="inline-flex svg-w-h-10" />
            </Button>
            <Button
              onClick={handleNext}
              className="bottom-[50%] right-0 absolute text-[13px] font-semibold px-[8px] inline-flex items-center bg-transparent text-white"
            >
              <RightOutlined className="inline-flex svg-w-h-10 dark:[&>svg]:!text-dark" />
            </Button>
            <img
              className="mx-auto"
              src={slide.image}
              alt={`Slide ${slide.id}`}
              style={{ width: '100%', height: '50%', borderRadius: '10px', ...contentStyle }}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;

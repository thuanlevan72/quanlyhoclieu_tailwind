import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { UilAngleRightB, UilAngleLeftB } from '@iconscout/react-unicons';

const contentStyle = {
  height: '512px',
  width: '1500px',
  textAlign: 'center',
  borderRadius: '10px',
  lineHeight: '300px',
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
        'https://ccweb.imgix.net/https%3A%2F%2Fwww.classcentral.com%2Fimages%2Fmeta%2Fmeta-default.png?auto=format&ixlib=php-4.1.0&s=a980b3b7b5c83a15eac6da49bbbbc182',
    },
    {
      id: 2,
      image: 'https://www.classcentral.com/report/wp-content/uploads/2022/06/JavaScript-BCG-Banner-icons.png',
    },
    {
      id: 3,
      image: 'https://www.classcentral.com/report/wp-content/uploads/2022/07/C-BCG-Banner.png',
    },
    {
      id: 4,
      image: 'https://www.classcentral.com/report/wp-content/uploads/2022/10/React-JS-BCG-Banner.png',
    },
  ];

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <Carousel style={carouselStyle} autoplay autoplaySpeed={5000} easing="ease" ref={carouselRef}>
      {slides.map((slide) => (
        <div key={slide.id} style={{ contentStyle }} className="relative">
          <Button
            onClick={handlePrev}
            className="bottom-[50%] left-[5%] absolute active text-white font-semibold bg-transparent 
             px-[8px] inline-flex items-center border-none bg-white w-[40px] h-[40px] rounded-[50%]"
          >
            <UilAngleLeftB className="inline-flex text-gray-400 hover:text-black" />
          </Button>
          <Button
            onClick={handleNext}
            className="bottom-[50%] right-[5%] absolute font-semibold px-[8px] 
              inline-flex items-center bg-transparent text-white border-none bg-white w-[40px] h-[40px] rounded-[50%]"
          >
            <UilAngleRightB className="inline-flex text-gray-400 hover:text-black" />
          </Button>
          <img
            className="mx-auto"
            src={slide.image}
            alt={`Slide ${slide.id}`}
            style={{ width: '100%', height: '50%', borderRadius: '10px', ...contentStyle }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;

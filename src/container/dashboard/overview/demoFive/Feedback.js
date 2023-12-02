import React from 'react';
import { Carousel, Avatar, Card } from 'antd';
// Tùy chọn: tạo một file CSS để tùy chỉnh giao diện

function Feedback() {
  const peopleData = [
    {
      id: 1,
      name: 'John Doe',
      position: 'IT Student',
      avatar: 'https://example.com/avatar1.jpg',
      comment:
        'The support from the LD Academy community and the responsiveness of the instructors have been invaluable. Whenever I had questions or needed clarification, there was always someone ready to help',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'IT Student',
      avatar: 'https://example.com/avatar2.jpg',
      comment:
        'What sets LD Academy apart for me is the hands-on approach to learning. The practical projects and real-world scenarios provided in the courses have significantly contributed to my understanding and skill development. It is not just about theoretical knowledge but also about gaining practical experience that is directly applicable in the industry.',
    },
    {
      id: 3,
      name: 'Jane Smith',
      position: 'IT Student',
      avatar: 'https://example.com/avatar2.jpg',
      comment:
        'The instructors at LD Academy are not only knowledgeable but also skilled in delivering complex concepts in a way that is easy to understand. The courses are well-structured, engaging, and cover a wide range of relevant topics.',
    },
    {
      id: 4,
      name: 'Jane Smith',
      position: 'IT Student',
      avatar: 'https://example.com/avatar2.jpg',
      comment:
        'I just wanted to take a moment to express my sincere gratitude to LD Academy for providing excellent courses. The learning experience has been nothing short of exceptional, and I am thoroughly impressed with the quality of the content.',
    },
    {
      id: 5,
      name: 'Jane Smith',
      position: 'IT Student',
      avatar: 'https://example.com/avatar2.jpg',
      comment: '123',
    },
    // Thêm nhiều người khác nếu cần
  ];

  return (
    <div className="">
      <h2 className="text-center text-4xl text-primary font-bold">Student feedback about us</h2>
      <Carousel slidesToShow={2} autoplay autoplaySpeed={2000}>
        {peopleData.map((person) => (
          <div key={person.id}>
            <Card className="h-[400px] person-card flex flex-col justify-center items-center text-center">
              <Avatar size={64} src={person.avatar} />
              <h3>{person.name}</h3>
              <p>{person.position}</p>
              <p>{person.comment}</p>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Feedback;

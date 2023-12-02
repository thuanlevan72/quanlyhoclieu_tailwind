import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const data = [
  {
    id: 1,
    title: 'Commitment after graduation',
    content:
      'We are committed to assisting students in finding suitable employment aligned with their skills and expertise shortly after graduation, typically within 4-6 months of study.',
  },
  {
    id: 2,
    title: 'Flexible Learning Time',
    content:
      'Unlike current traditional training models, with our 1:1 learning format alongside mentors boasting 5 years of experience at LD academy, knowledge and experience are conveyed in the most detailed manner—simple, comprehensible, helping students overcome the fear of asking questions',
  },
  {
    id: 3,
    title: 'Practical Programming Training Model',
    content:
      'Our instructors are active programmers in leading technology corporations, and their lectures are distilled from CEO Dang Manh Hien 16 years of teaching experience along with ongoing real-world projects at the LD Group.',
  },
  {
    id: 4,
    title: 'Practical Programming Training Model',
    content:
      'Our instructors are active programmers in leading technology corporations, and their lectures are distilled from CEO Dang Manh Hien 16 years of teaching experience along with ongoing real-world projects at the LD Group.',
  },
  {
    id: 5,
    title: 'Practical Programming Training Model',
    content:
      'Our instructors are active programmers in leading technology corporations, and their lectures are distilled from CEO Dang Manh Hien 16 years of teaching experience along with ongoing real-world projects at the LD Group.',
  },
  {
    id: 6,
    title: 'Practical Programming Training Model',
    content:
      'Our instructors are active programmers in leading technology corporations, and their lectures are distilled from CEO Dang Manh Hien 16 years of teaching experience along with ongoing real-world projects at the LD Group.',
  },
  {
    id: 7,
    title: 'Practical Programming Training Model',
    content:
      'Our instructors are active programmers in leading technology corporations, and their lectures are distilled from CEO Dang Manh Hien 16 years of teaching experience along with ongoing real-world projects at the LD Group.',
  },
  {
    id: 8,
    title: 'Practical Programming Training Model',
    content:
      'Our instructors are active programmers in leading technology corporations, and their lectures are distilled from CEO Dang Manh Hien 16 years of teaching experience along with ongoing real-world projects at the LD Group.',
  },
];

function collapseComponent() {
  return (
    <Collapse className="mt-12" accordion>
      {data.map((item) => (
        <Panel header={item.title} key={item.id}>
          <p className="text-purple-500">{item.content}</p>
        </Panel>
      ))}
    </Collapse>
  );
}

export default collapseComponent;

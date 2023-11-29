import PropTypes, { object } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalStyled } from './styled';
import { Button } from '../buttons/buttons';

function Modal(props) {
  const { onCancel, className, onOk, visible, title, type, color, footer, width, children } = props;
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'Con chó có mấy chân?',
      answers: [
        {
          id: 1,
          info: 'Một',
          isChoosed: false,
        },
        {
          id: 2,
          info: 'Hai',
          isChoosed: false,
        },
        {
          id: 3,
          info: 'Ba',
          isChoosed: false,
        },
        {
          id: 4,
          info: 'Bốn',
          isChoosed: false,
        },
      ],
    },
    {
      id: 2,
      title: 'Con mèo có mấy chân?',
      answers: [
        {
          id: 5,
          info: 'Năm',
          isChoosed: false,
        },
        {
          id: 6,
          info: 'Sáu',
          isChoosed: false,
        },
        {
          id: 7,
          info: 'Bảy',
          isChoosed: false,
        },
        {
          id: 8,
          info: 'Tám',
          isChoosed: false,
        },
      ],
    },
  ]);

  const tickAns = (quesID, ansID) => {
    console.log(quesID, ansID);
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[quesID] = {
        ...newQuestions[quesID],
        answers: newQuestions[quesID].answers.map((cls, index) => {
          cls.isChoosed = false;
          if (index === ansID) {
            cls.isChoosed = !cls.isChoosed;
          }
          return cls;
        }),
      };
      return newQuestions;
    });
  };

  return (
    <>
      <ModalStyled
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        type={color ? type : false}
        width={width}
        className={className}
        footer={
          footer || footer === null
            ? footer
            : [
                <Button
                  type="secondary"
                  key="back"
                  onClick={onCancel}
                  className="hover:border-[#ffa502] hover:text-[#ffa502]"
                >
                  Cancel
                </Button>,
                <Button type={type} key="submit" onClick={onOk} className="hover:border-[#ffa502] hover:text-[#ffa502]">
                  Done
                </Button>,
              ]
        }
      >
        <div className="text-[60px] mb-[40px] text-[#ffa502]">Test 01:</div>
        <div>
          {questions.map((question, index) => (
            <div className="mt-[20px] border-[2px] py-[10px] shadow-lg">
              <div className="w-[100%] flex justify-center">
                <div className="w-[80%] flex justify-start flex-wrap text-[30px]">
                  <div className="w-[100%] text-[40px]">
                    {index + 1}. {question.title}
                  </div>
                  <div className="ml-[50px]">
                    {question.answers.map((answer, index1) => (
                      <Link onClick={() => tickAns(index, index1)}>
                        <div
                          className={`text-body border-[2px] px-[10px] w-[400px] max-w-[700px] lg:w-[200px] rounded-6 my-[10px] 
                          cursor-pointer ${answer.isChoosed ? 'border-[#ffa502]' : ''}`}
                        >
                          {index1 + 1}. {answer.info}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {children}
      </ModalStyled>
    </>
  );
}

Modal.defaultProps = {
  width: 620,
  className: 'atbd-modal',
};

Modal.propTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  footer: PropTypes.arrayOf(object),
  width: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

const alertModal = ModalStyled;
export { Modal, alertModal };

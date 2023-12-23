import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Heading from '../../../components/heading/heading';

function TutorCards({ user }) {
  const { fullName, contactNumber, tutorID } = user;
  return (
    <div className="relative">
      <div
        className="bg-white dark:bg-white10 px-[25px] pt-[30px] pb-[18px] rounded-[10px] text-center hover:bg-[#eccc68] 
      hover:scale-105 transition-transform duration-300 transform"
      >
        <Link to={`${tutorID}`}>
          <figure className="mb-0">
            <img
              className="mb-[18px] max-w-[120px] w-full rounded-full inline-block"
              src={require(`../../../static/img/avatar/chat-auth.png`)}
              alt=""
            />
          </figure>
          <Link />
          <figcaption>
            <div className="static">
              <Heading className="text-[16px] mb-[6px] font-medium text-dark dark:text-white87 leading-[20px]" as="h6">
                <Link className="text-dark dark:text-white87" to="#">
                  {fullName}
                </Link>
              </Heading>
              {/* <p className="text-[13px] mb-[25px] text-light dark:text-white60">{designation}</p> */}
            </div>

            <div className="static pt-[20px] mt-[18px] dark:border-white10 border-t-1">
              <Row gutter={15}>
                <Col xs={24}>
                  <div>
                    <h2 className="text-[16px] font-semibold leading-[1.5] mb-4px text-dark dark:text-white60">
                      {' '}
                      {contactNumber}
                    </h2>
                    <p className="mb-0 text-light dark:text-white60">Contact Number</p>
                  </div>
                </Col>
              </Row>
            </div>
          </figcaption>
        </Link>
      </div>
    </div>
  );
}

TutorCards.propTypes = {
  user: PropTypes.object,
};

export default TutorCards;

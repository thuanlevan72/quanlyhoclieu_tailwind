import React from 'react';
// import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import CountUp from 'react-countup';
import Heading from '../../../components/heading/heading';
// import { Button } from '../../../components/buttons/buttons';

function UserCards({ user }) {
  const { fullName, totalMoney, contactNumber, studentID } = user;
  return (
    <div className="relative">
      <div className="bg-white dark:bg-white10 px-[25px] pt-[30px] pb-[18px] rounded-[10px] text-center hover:bg-[#7bed9f] hover:scale-105">
        <Link to={`${studentID}`}>
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

            {/* <div className="static flex flex-wrap items-center justify-center gap-[10px]">
              <Button
                className="group text-[13px] font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] 
                dark:border-white10 px-[25px] rounded-[6px] flex items-center gap-[5px] leading-[22px] hover:text-white 
                hover:bg-[#2ed573] transition duration-300 dark:bg-transparent border-normal"
                size="default"
                onClick={() => {}}
              >
                <UilEnvelope className="w-[15px] h-[15px] text-light dark:text-white87 group-hover:text-white transition duration-300" />
                Message
              </Button>
            </div> */}
            <div className="static pt-[20px] mt-[18px] dark:border-white10 border-t-1">
              <Row gutter={15}>
                <Col xs={12}>
                  <div>
                    <h2 className="text-[16px] font-semibold leading-[1.5] mb-4px text-dark dark:text-white87">
                      {' '}
                      <CountUp start={0} end={totalMoney} /> VND
                    </h2>
                    <p className="mb-0 text-light dark:text-white60">Total Money</p>
                  </div>
                </Col>
                <Col xs={12}>
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

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;

import { Card, Col } from 'antd';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function LectureCard({ lectureData }) {
  console.log(lectureData);
  const { id, thumbnail, title, navid } = lectureData;
  const decentralization = Cookies.get('decentralization');
  return (
    <Col xxl={6} lg={8} sm={12} xs={24}>
      <div className="mb-[25px] [&>.ant-card>.ant-card-body]:p-[18px]">
        <Card bordered="false">
          <div className="mb-[15px] rounded-[10px]">
            <img className="3xl:w-full" src={require(`../../static/img/thumbnails/${thumbnail}`)} alt="hexadash" />
          </div>
          <div>
            <h4 className="text-xl 3xl:text-lg font-semibold mb-3">
              <Link
                className="text-dark hover:text-secondary dark:text-white87 dark:hover:text-secondary"
                to={`/${decentralization}/courseWave/lectures/lecturesCard/${navid}/lectureNumber/${id}`}
              >
                {title}
              </Link>
            </h4>
          </div>
        </Card>
      </div>
    </Col>
  );
}

LectureCard.propTypes = {
  lectureData: PropTypes.object,
};

export default LectureCard;

import React from 'react';
import moment from 'moment';
import Schedule from "@material-ui/icons/Schedule";
import Today from "@material-ui/icons/Today";
import Place from "@material-ui/icons/Place";
import Face from "@material-ui/icons/Face";
import Store from "@material-ui/icons/Store";

import { Card, CardTitle, CardBody } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';

const LearningCircleCard = (props) => {
  const { learningCircle } = props;
  const startDate = moment(`${learningCircle.start_date} ${learningCircle.meeting_time}`);
  const endDate = moment(`${learningCircle.start_date} ${learningCircle.end_time}`);
  const formattedDate = startDate.format('MMMM Do, YYYY');
  const formattedStartTime = startDate.format('h:mma');
  const formattedEndTime = endDate.format('h:mma');
  const schedule = `${learningCircle.day} from ${formattedStartTime} to ${formattedEndTime} (${learningCircle.time_zone})`;
  const duration = `${learningCircle.weeks} weeks starting ${formattedDate}`;
  const name = learningCircle.course.title
  const colorClass = COLOR_CLASSES[(learningCircle.course.id % COLOR_CLASSES.length)];

  return (
    <Card colorClass={colorClass}>
      <CardTitle>{ name }</CardTitle>

      {
        learningCircle.image_url &&
        <div className="image-container hidden-on-mobile">
          <div className="image">
            <img src={ learningCircle.image_url } alt={ name } />
          </div>
        </div>
      }

      <CardBody>
        <p className="schedule">
          <Schedule />
          { schedule }
        </p>
        <p className="duration">
          <Today />
          { duration }
        </p>
        <p className="city-country">
          <Place />
          { learningCircle.city }
        </p>
        <p className="facilitator">
          <Face />
          Facilitated by { learningCircle.facilitator }
        </p>
        <p className="location">
          <Store />
          Meeting at { learningCircle.venue }
        </p>
        <div className='actions'>
          <div className="primary-cta">
            <a href={ learningCircle.url } className="btn p2pu-btn transparent">
              Sign up
            </a>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default LearningCircleCard

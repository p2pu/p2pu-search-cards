import React from 'react'
import { t } from "ttag";
import { Card, CardTitle, CardBody } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';
import { date, day, time } from '../utils/i18n';

const LearningCircleCard = (props) => {
  const { learningCircle } = props;
  const formattedDate = date(learningCircle.start_date);
  const formattedStartTime = time(learningCircle.meeting_time);
  const formattedEndTime = time(learningCircle.end_time);
  const weekDay = day(learningCircle.day);
  const schedule = t`${weekDay} from ${formattedStartTime} to ${formattedEndTime} (${learningCircle.time_zone})`;
  const duration = t`${learningCircle.weeks} weeks starting ${formattedDate}`;
  const name = learningCircle.course.title
  const colorClass = COLOR_CLASSES[(learningCircle.course.id % COLOR_CLASSES.length)];

  var cta = (
    <a href={ learningCircle.url } className="btn p2pu-btn transparent">
      {t`Sign up`}
    </a>
  );
  if (props.onSelectResult) {
    cta = (
      <button onClick={()=>props.onSelectResult(learningCircle)} className="btn p2pu-btn transparent">
        {t`Sign up`}
      </button>
    );
  }


  return (
    <Card colorClass={colorClass} classes={`${props.classes}`}>
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
          <i className="material-icons">schedule</i>
          { schedule }
        </p>
        <p className="duration">
          <i className="material-icons">today</i>
          { duration }
        </p>
        <p className="city-country">
          <i className="material-icons">place</i>
          { learningCircle.city }
        </p>
        <p className="facilitator">
          <i className="material-icons">face</i>
          {t`Facilitated by ${learningCircle.facilitator}`}
        </p>
        <p className="location">
          <i className="material-icons">store</i>
          {t`Meeting at ${learningCircle.venue}`}
        </p>
        <div className='actions'>
          <div className="primary-cta">
            {cta}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default LearningCircleCard

import React from 'react'
import { t } from "ttag";
import { Card, CardTitle, CardBody } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';
import { date, day, time } from '../utils/i18n';

const cardFormatting = {
  'upcoming': {
    color: 'p2pu-blue',
    label: 'Starting soon'
  },
  'in_progress': {
    color: 'p2pu-green',
    label: 'In progress'
  },
  'closed': {
    color: 'p2pu-yellow',
    label: 'Sign up closed'
  },
  'completed': {
    color: 'p2pu-gray',
    label: 'Completed'
  }
}

const LearningCircleCard = (props) => {
  const { learningCircle, locale, onSelectResult } = props;
  const formattedStartDate = date(learningCircle.start_date, locale);
  const formattedStartTime = time(learningCircle.meeting_time);
  const formattedEndDate = date(learningCircle.last_meeting_date, locale);
  const formattedEndTime = time(learningCircle.end_time);
  const weekDay = day(learningCircle.day);
  const schedule = t`${weekDay} from ${formattedStartTime} to ${formattedEndTime} (${learningCircle.time_zone})`;
  const duration = t`${learningCircle.weeks} weeks starting ${formattedStartDate}`;
  const name = learningCircle.name ? learningCircle.name : learningCircle.course.title;

  const isSignupOpen = props.isSignupOpen
  const today = new Date()
  const startDate = new Date(learningCircle.start_date)
  const endDate = new Date(learningCircle.last_meeting_date)

  const isUpcoming = startDate > today
  const isCompleted = endDate < today
  const isInProgress = startDate < today && endDate > today



  const colorClass = cardFormatting[learningCircle.status].color
  const cardLabel = cardFormatting[learningCircle.status].label

  let dateLabel = t`Ended ${formattedEndDate}`
  if (learningCircle.status === 'in_progress' || learningCircle.status === 'closed') {
    dateLabel = t`Started ${formattedStartDate}`
  } else if (learningCircle.status === 'upcoming') {
    dateLabel = t`Starting ${formattedStartDate}`
  }

  const onClick = () => {
    if (onSelectResult) {
      onSelectResult(learningCircle)
    } else {
      window.location.href = learningCircle.url;
    }
  }

  return (
    <Card colorClass={colorClass} classes={`${props.classes}`} role='button' tabIndex={0} onClick={onClick}>
      <div className="status-tag minicaps bold">{t(cardLabel)}</div>
      <CardTitle>{ name }</CardTitle>
      <CardBody>
        <p className="start-date bold m-0">
          {dateLabel}
        </p>
      </CardBody>
      <CardBody>
        {
          learningCircle.image_url &&
          <div className="image-container hidden-on-mobile mb-2">
            <div className="square" />
            <div className="circle" />
            <div className="image">
              <img src={ `${learningCircle.image_url}` } alt={ name } />
            </div>
          </div>
        }

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
            <button className="btn p2pu-btn transparent">
              {isSignupOpen ? t`Sign up` : t`View details`}
            </button>
          </div>
        </div>

      </CardBody>
    </Card>
  );
}

export default LearningCircleCard

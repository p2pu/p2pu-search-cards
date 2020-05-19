import React, { Fragment } from 'react'
import { t, jt, ngettext, msgid } from 'ttag';

import { Card, CardTitle, CardBody, UsageBadge } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';

const CourseCard = (props) => {
  const {
    courseLink = false,
    moreInfo = true,
  } = props;

  const availability = props.course.on_demand ? t`Always available` : t`Check availability`;
  const handleFilterClick = topic => {
    return (event) => {
      event.preventDefault()
      props.updateQueryParams({ topics: [topic] })
    }
  };
  const topicsList = props.course.topics.slice(0, 5).map( topic => {
    return <a className='tag' onClick={handleFilterClick(topic)} href={""}>{topic}</a>
  });
  const colorClass = COLOR_CLASSES[(props.course.id % COLOR_CLASSES.length)];

  const rating_number = <strong>{props.course.total_ratings}</strong>;
  let rating = jt`${rating_number} ratings`;
  if (props.course.total_ratings == 1){
    rating = jt`${rating_number} rating`;
  }

  let usage_number = <strong>{props.course.learning_circles}</strong>;
  let usage = jt`Used in ${usage_number} learning circles`;
  if (props.course.learning_circles == 1){
    usage = jt`Used in ${usage_number} learning circle`;
  }

  return (
    <Card classes={`alt ${props.classes}`} colorClass={colorClass}>
      <CardTitle>{ props.course.title }</CardTitle>
      <CardBody>
        <div className={`stars mb-2 ${props.course.total_ratings == 0 && 'disabled'}`}>
          { [1,2,3,4,5].map(num => {
            const rating = Math.round(props.course.overall_rating * 2)/2
            if (rating >= num) {
              return <i className="material-icons" key={`star-${num}`}>star</i>
            } else if (rating == num - 0.5) {
              return <i className="material-icons" key={`star-${num}`}>star_half</i>
            } else {
              return <i className="material-icons" key={`star-${num}`}>star_border</i>
            }
          })}
        </div>
        <div className="minicaps">{rating} | {usage}</div>
      </CardBody>

      <CardBody>
        <p className="caption">{ props.course.caption }</p>

        <div className="my-3">
          <div className="grid-wrapper">
            <div className="label">{t`Topics`}</div>
            <div>
              <span className='topics-list'>
                { topicsList.map((topic, index) => {
                  return <span key={index}>{!!index && ', '}{topic}</span>
                })}
              </span>
            </div>

            <div className="label">{t`Provider`}</div>
            <div>{ props.course.provider }</div>

          { props.course.platform &&
            <Fragment>
              <div className="label">{t`Platform`}</div>
              <div>{ props.course.platform }</div>
            </Fragment>
          }

            <div className="label">{t`Access`}</div>
            <div>{ availability }</div>

          </div>
        </div>

        <div className='actions'>
          <div className="alt-cta">
            { 
              moreInfo &&
                <a href={ props.course.course_page_url } target="_blank" className="p2pu-btn dark secondary">{t`More details`}</a> 
            }
            { 
              courseLink &&
                <a href={ props.course.link } target="_blank" className="p2pu-btn dark secondary">{t`Course website`}</a> 
            }
            {
              props.onSelectResult &&
              <button onClick={() => props.onSelectResult(props.course)} className="p2pu-btn dark">{props.buttonText}</button>
            }
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default CourseCard

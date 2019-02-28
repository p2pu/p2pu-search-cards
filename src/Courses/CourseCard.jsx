import React from 'react'

import { Card, CardTitle, CardBody, UsageBadge } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';

const CourseCard = (props) => {

  const availability = props.course.on_demand ? 'Always available' : 'Check availability';
  const handleFilterClick = (topic) => {
    return () => { props.updateQueryParams({ topics: [topic] }) }
  };
  const topicsList = props.course.topics.slice(0, 5).map( topic => {
    return <a className='tag' onClick={handleFilterClick(topic)}>{topic}</a>
  });
  const colorClass = COLOR_CLASSES[(props.course.id % COLOR_CLASSES.length)];

  return (
    <Card classes="alt">
      <CardTitle>{ props.course.title }</CardTitle>
      <CardBody>
        <div className="stars mb-2">
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
        <div className="minicaps"><strong>{props.course.total_ratings}</strong> ratings  |  Used in <strong>{props.course.learning_circles}</strong> learning circles</div>
      </CardBody>

      <CardBody>
        <p className="caption">{ props.course.caption }</p>

        <div className="my-3">
          <div className="grid-wrapper">
            <div className="label">Topics</div>
            <div>
              <span className='topics-list'>
                { topicsList.map((topic, index) => {
                  return <span key={index}>{!!index && ', '}{topic}</span>
                })}
              </span>
            </div>
          </div>

          <div className="grid-wrapper">
            <div className="label">Provider</div>
            <div>{ props.course.provider }</div>
          </div>

          { props.course.platform &&
            <div className="grid-wrapper">
              <div className="label">Platform</div>
              <div>{ props.course.platform }</div>
            </div>
          }

          <div className="grid-wrapper">
            <div className="label">Access</div>
            <div>{ availability }</div>
          </div>

          { props.course.tagdorsements &&
            <div className="grid-wrapper">
              <div className="label">Community feedback</div>
              <div>{ props.course.tagdorsements.toLowerCase() }</div>
            </div>
          }

        </div>

        <div className='actions'>
            <div className="alt-cta">
              <a href={ props.course.course_page_url } target="_blank" className="btn p2pu-btn blue secondary">More details</a>
            {
              props.onSelectResult &&
              <button onClick={() => props.onSelectResult(props.course)} className="btn p2pu-btn blue">{props.buttonText}</button>
            }
            </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default CourseCard

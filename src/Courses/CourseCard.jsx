import React from 'react'

import Label from "@material-ui/icons/Label";
import School from "@material-ui/icons/School";
import Schedule from "@material-ui/icons/Schedule";
import OpenInNew from "@material-ui/icons/OpenInNew";

import { Card, CardTitle, CardBody, UsageBadge } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';

const CourseCard = (props) => {

  const feedbackPage = `https://etherpad.p2pu.org/p/course-feedback-${props.course.id}`;
  const availability = props.course.on_demand ? 'Course available on demand' : 'Check course availability';
  const handleFilterClick = (topic) => {
    return () => { props.updateQueryParams({ topics: [topic] }) }
  };
  const topicsList = props.course.topics.slice(0, 5).map( topic => {
    return <a className='tag' onClick={handleFilterClick(topic)}>{topic}</a>
  });
  const colorClass = COLOR_CLASSES[(props.course.id % COLOR_CLASSES.length)];

  return (
    <Card colorClass={colorClass}>
      <UsageBadge number={props.course.learning_circles} id={props.id} />
      <CardTitle>{ props.course.title }</CardTitle>
      <CardBody>
        <p className="caption">{ props.course.caption }</p>
        <div className="divider"></div>
        <p className="tags small-caps">
          <Label />
          <span className='topics-list'>
            { topicsList.map((topic, index) => {
              return <span key={index}>{!!index && ', '}{topic}</span>
            })}
          </span>
        </p>
        <p className="provider small-caps">
          <School />
          { `Provided by ${props.course.provider}` }
        </p>
        <p className="availability small-caps">
          <Schedule />
          { availability }
        </p>
        <div className="divider"></div>
        <div className='actions'>
          <div className="secondary-cta">
            <a href={props.course.link} target='_blank'>
              <OpenInNew />See the course
            </a>
            <a href={feedbackPage} target='_blank'>
              <OpenInNew />Facilitator feedback
            </a>
          </div>
          {
            props.onSelectResult &&
            <div className="primary-cta">
              <button onClick={() => props.onSelectResult(props.course)} className="btn p2pu-btn transparent">{props.buttonText}</button>
            </div>
          }
        </div>
      </CardBody>
    </Card>
  );
}

export default CourseCard

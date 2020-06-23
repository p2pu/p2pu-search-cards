import React from 'react';
import { t } from "ttag";
import { Card, CardTitle, CardBody } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';
import { date, day, time } from '../utils/i18n';

const LearningCircleCard = props => {
  const {
    learningCircle,
    locale
  } = props;
  const formattedDate = date(learningCircle.start_date, locale);
  const formattedStartTime = time(learningCircle.meeting_time);
  const formattedEndTime = time(learningCircle.end_time);
  const weekDay = day(learningCircle.day);
  const schedule = t`${weekDay} from ${formattedStartTime} to ${formattedEndTime} (${learningCircle.time_zone})`;
  const duration = t`${learningCircle.weeks} weeks starting ${formattedDate}`;
  const name = learningCircle.name ? learningCircle.name : learningCircle.course.title;
  const colorClass = COLOR_CLASSES[learningCircle.course.id % COLOR_CLASSES.length];
  let cta = /*#__PURE__*/React.createElement("a", {
    href: `${learningCircle.url}?prev=${encodeURIComponent(window.location.href)}`,
    className: "btn p2pu-btn transparent"
  }, t`Sign up`);

  if (props.onSelectResult) {
    cta = /*#__PURE__*/React.createElement("button", {
      onClick: () => props.onSelectResult(learningCircle),
      className: "btn p2pu-btn transparent"
    }, t`Sign up`);
  }

  return /*#__PURE__*/React.createElement(Card, {
    colorClass: colorClass,
    classes: `${props.classes}`
  }, /*#__PURE__*/React.createElement(CardTitle, null, name), learningCircle.image_url && /*#__PURE__*/React.createElement("div", {
    className: "image-container hidden-on-mobile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement("img", {
    src: learningCircle.image_url,
    alt: name
  }))), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("p", {
    className: "schedule"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "schedule"), schedule), /*#__PURE__*/React.createElement("p", {
    className: "duration"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "today"), duration), /*#__PURE__*/React.createElement("p", {
    className: "city-country"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "place"), learningCircle.city), /*#__PURE__*/React.createElement("p", {
    className: "facilitator"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "face"), t`Facilitated by ${learningCircle.facilitator}`), /*#__PURE__*/React.createElement("p", {
    className: "location"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "store"), t`Meeting at ${learningCircle.venue}`), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "primary-cta"
  }, cta))));
};

export default LearningCircleCard;
import _extends from "@babel/runtime/helpers/extends";
import React, { useRef, useEffect } from 'react';
import { ngettext, msgid, t, jt } from 'ttag';
import SignupForm from './SignupForm';
import { day, date, time } from '../utils/i18n';

const LearningCircleSignup = ({
  learningCircle,
  ...rest
}) => {
  const form = useRef();
  useEffect(() => form.current.scrollIntoView({
    behavior: "smooth"
  }));
  const {
    course
  } = learningCircle;
  let meetingDay = /*#__PURE__*/React.createElement("strong", null, day(learningCircle.day));
  let startDate = /*#__PURE__*/React.createElement("strong", null, date(learningCircle.start_date));
  let startTime = /*#__PURE__*/React.createElement("strong", null, time(learningCircle.meeting_time));
  let endTime = /*#__PURE__*/React.createElement("strong", null, time(learningCircle.end_time));
  let courseProviderLink = /*#__PURE__*/React.createElement("a", {
    href: course.link,
    target: "_blank"
  }, learningCircle.course.provider);
  let venueLink = /*#__PURE__*/React.createElement("a", {
    href: learningCircle.venue_website
  }, learningCircle.venue);
  return /*#__PURE__*/React.createElement("div", {
    className: "form-container pt-5",
    ref: form
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mb-5"
  }, t`Sign up for ${course.title}`), /*#__PURE__*/React.createElement("p", null, course.caption))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, learningCircle.image_url && /*#__PURE__*/React.createElement("img", {
    className: "img-fluid",
    src: learningCircle.image_url
  }), /*#__PURE__*/React.createElement("p", null, learningCircle.description), /*#__PURE__*/React.createElement("p", null, t`Facilitated by ${learningCircle.facilitator}`), /*#__PURE__*/React.createElement("p", null, jt`Course materials provided by ${courseProviderLink}`), /*#__PURE__*/React.createElement("p", null, learningCircle.weeks <= 1 && jt`This learning circle meets ${meetingDay} from ${startTime} to ${endTime} (${learningCircle.time_zone}), ${startDate}.`, learningCircle.weeks > 1 && jt`This learning circle meets every ${meetingDay} from ${startTime} to ${endTime} (${learningCircle.time_zone}) starting ${startDate} for ${learningCircle.weeks} weeks.`), /*#__PURE__*/React.createElement("p", null, jt`At ${venueLink}, ${learningCircle.venue_address}`)), /*#__PURE__*/React.createElement("div", {
    className: "col-md-8"
  }, /*#__PURE__*/React.createElement(SignupForm, _extends({
    learningCircle: learningCircle
  }, rest)))));
};

export default LearningCircleSignup;
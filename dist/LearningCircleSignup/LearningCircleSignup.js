import _extends from "@babel/runtime/helpers/extends";
import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function _templateObject6() {
  var data = _taggedTemplateLiteral(["At ", ", ", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["This learning circle meets every ", " from ", " to ", " (", ") starting ", " for ", " weeks."]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["This learning circle meets ", " from ", " to ", " (", "), ", "."]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Course materials provided by ", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Facilitated by ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Sign up for ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { useRef, useEffect } from 'react';
import { ngettext, msgid, t, jt } from 'ttag';
import SignupForm from './SignupForm';
import { day, date, time } from '../utils/i18n';

var LearningCircleSignup = function LearningCircleSignup(_ref) {
  var learningCircle = _ref.learningCircle,
      rest = _objectWithoutProperties(_ref, ["learningCircle"]);

  var form = useRef();
  useEffect(function () {
    return form.current.scrollIntoView({
      behavior: "smooth"
    });
  });
  var course = learningCircle.course;
  var meetingDay = /*#__PURE__*/React.createElement("strong", null, day(learningCircle.day));
  var startDate = /*#__PURE__*/React.createElement("strong", null, date(learningCircle.start_date));
  var startTime = /*#__PURE__*/React.createElement("strong", null, time(learningCircle.meeting_time));
  var endTime = /*#__PURE__*/React.createElement("strong", null, time(learningCircle.end_time));
  var courseProviderLink = /*#__PURE__*/React.createElement("a", {
    href: course.link,
    target: "_blank"
  }, learningCircle.course.provider);
  var venueLink = /*#__PURE__*/React.createElement("a", {
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
  }, t(_templateObject(), course.title)), /*#__PURE__*/React.createElement("p", null, course.caption))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, learningCircle.image_url && /*#__PURE__*/React.createElement("img", {
    className: "img-fluid",
    src: learningCircle.image_url
  }), /*#__PURE__*/React.createElement("p", null, learningCircle.description), /*#__PURE__*/React.createElement("p", null, t(_templateObject2(), learningCircle.facilitator)), /*#__PURE__*/React.createElement("p", null, jt(_templateObject3(), courseProviderLink)), /*#__PURE__*/React.createElement("p", null, learningCircle.weeks <= 1 && jt(_templateObject4(), meetingDay, startTime, endTime, learningCircle.time_zone, startDate), learningCircle.weeks > 1 && jt(_templateObject5(), meetingDay, startTime, endTime, learningCircle.time_zone, startDate, learningCircle.weeks)), /*#__PURE__*/React.createElement("p", null, jt(_templateObject6(), venueLink, learningCircle.venue_address))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-8"
  }, /*#__PURE__*/React.createElement(SignupForm, _extends({
    learningCircle: learningCircle
  }, rest)))));
};

export default LearningCircleSignup;
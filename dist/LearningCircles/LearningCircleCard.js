import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Sign up"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Meeting at ", ""]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Facilitated by ", ""]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Starting ", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Started ", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Ended ", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Registration open!"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["", " weeks starting ", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["", " from ", " to ", " (", ")"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import { t } from "ttag";
import { Card, CardTitle, CardBody } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';
import { date, day, time } from '../utils/i18n';

var LearningCircleCard = function LearningCircleCard(props) {
  var learningCircle = props.learningCircle,
      locale = props.locale,
      onSelectResult = props.onSelectResult;
  var formattedStartDate = date(learningCircle.start_date, locale);
  var formattedStartTime = time(learningCircle.meeting_time);
  var formattedEndDate = date(learningCircle.last_meeting_date, locale);
  var formattedEndTime = time(learningCircle.end_time);
  var weekDay = day(learningCircle.day);
  var schedule = t(_templateObject(), weekDay, formattedStartTime, formattedEndTime, learningCircle.time_zone);
  var duration = t(_templateObject2(), learningCircle.weeks, formattedStartDate);
  var name = learningCircle.name ? learningCircle.name : learningCircle.course.title;
  var colorClass = COLOR_CLASSES[learningCircle.course.id % COLOR_CLASSES.length];
  var isSignupOpen = props.isSignupOpen;
  var isCompleted = new Date(learningCircle.last_meeting_date) < new Date();
  var isInProgress = !isCompleted && new Date(learningCircle.start_date) < new Date();

  var onClick = function onClick() {
    if (onSelectResult) {
      onSelectResult(learningCircle);
    } else {
      var url = "".concat(learningCircle.url, "?prev=").concat(encodeURIComponent(window.location.href));
      window.location.href = url;
    }
  };

  return /*#__PURE__*/React.createElement(Card, {
    colorClass: colorClass,
    classes: "".concat(props.classes, " ").concat(isSignupOpen ? "" : "closed"),
    role: "button",
    tabIndex: 0,
    onClick: onClick
  }, isSignupOpen && /*#__PURE__*/React.createElement("div", {
    className: "status-tag minicaps bold"
  }, t(_templateObject3())), /*#__PURE__*/React.createElement(CardTitle, null, name), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("p", {
    className: "start-date bold m-0"
  }, isCompleted ? t(_templateObject4(), formattedEndDate) : isInProgress ? t(_templateObject5(), formattedStartDate) : t(_templateObject6(), formattedStartDate))), /*#__PURE__*/React.createElement(CardBody, null, learningCircle.image_url && /*#__PURE__*/React.createElement("div", {
    className: "image-container hidden-on-mobile mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "square"
  }), /*#__PURE__*/React.createElement("div", {
    className: "circle"
  }), /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement("img", {
    src: "".concat(learningCircle.image_url),
    alt: name
  }))), /*#__PURE__*/React.createElement("p", {
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
  }, "face"), t(_templateObject7(), learningCircle.facilitator)), /*#__PURE__*/React.createElement("p", {
    className: "location"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "store"), t(_templateObject8(), learningCircle.venue)), isSignupOpen && /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "primary-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn p2pu-btn transparent"
  }, t(_templateObject9()))))));
};

export default LearningCircleCard;
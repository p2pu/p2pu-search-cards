import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject6() {
  var data = _taggedTemplateLiteral(["OER mode"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Sort by"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Meeting Day(s)"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Topics"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Language"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Location"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import { t } from 'ttag';

var Filter = function Filter(_ref) {
  var filter = _ref.filter,
      active = _ref.active,
      updateActiveFilter = _ref.updateActiveFilter,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? null : _ref$label;
  var filterNames = {
    'location': t(_templateObject()),
    'language': t(_templateObject2()),
    'topics': t(_templateObject3()),
    'meetingDays': t(_templateObject4()),
    'orderCourses': t(_templateObject5()),
    'oer': t(_templateObject6())
  };
  var iconName = active ? 'remove' : 'add';
  var activeClass = active ? 'active' : '';

  var handleClick = function handleClick() {
    var newValue = active ? '' : filter;
    updateActiveFilter(newValue);
  };

  var filterLabel = label || filterNames[filter];
  return /*#__PURE__*/React.createElement("div", {
    className: "filter ".concat(activeClass)
  }, /*#__PURE__*/React.createElement("button", {
    className: "p2pu-btn light with-outline",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexWrap: 'nowrap',
      whiteSpace: 'nowrap'
    }
  }, filterLabel)));
};

export default Filter;
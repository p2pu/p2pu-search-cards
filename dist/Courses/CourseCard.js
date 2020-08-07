import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Course website"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["More details"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Access"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["Platform"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Provider"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Topics"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Used in ", " learning circle"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Used in ", " learning circles"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["", " rating"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["", " ratings"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Check availability"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Always available"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { Fragment } from 'react';
import { t, jt, ngettext, msgid } from 'ttag';
import { Card, CardTitle, CardBody } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';

var CourseCard = function CourseCard(props) {
  var _props$courseLink = props.courseLink,
      courseLink = _props$courseLink === void 0 ? false : _props$courseLink,
      _props$moreInfo = props.moreInfo,
      moreInfo = _props$moreInfo === void 0 ? true : _props$moreInfo;
  var availability = props.course.on_demand ? t(_templateObject()) : t(_templateObject2());

  var handleFilterClick = function handleFilterClick(topic) {
    return function (event) {
      event.preventDefault();
      props.updateQueryParams({
        topics: [topic]
      });
    };
  };

  var topicsList = props.course.topics.slice(0, 5).map(function (topic) {
    return /*#__PURE__*/React.createElement("a", {
      className: "tag",
      onClick: handleFilterClick(topic),
      href: ""
    }, topic);
  });
  var colorClass = COLOR_CLASSES[props.course.id % COLOR_CLASSES.length];
  var rating_number = props.course.total_ratings;
  var rating = jt(_templateObject3(), rating_number);

  if (props.course.total_ratings == 1) {
    rating = jt(_templateObject4(), rating_number);
  }

  var usage_number = props.course.learning_circles;
  var usage = jt(_templateObject5(), usage_number);

  if (props.course.learning_circles == 1) {
    usage = jt(_templateObject6(), usage_number);
  }

  return /*#__PURE__*/React.createElement(Card, {
    classes: "".concat(props.classes),
    colorClass: colorClass,
    id: props.id
  }, /*#__PURE__*/React.createElement(CardTitle, null, props.course.title), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("div", {
    className: "stars mb-2 ".concat(props.course.total_ratings == 0 && 'disabled')
  }, [1, 2, 3, 4, 5].map(function (num) {
    var rating = Math.round(props.course.overall_rating * 2) / 2;

    if (rating >= num) {
      return /*#__PURE__*/React.createElement("i", {
        className: "material-icons",
        key: "star-".concat(num)
      }, "star");
    } else if (rating == num - 0.5) {
      return /*#__PURE__*/React.createElement("i", {
        className: "material-icons",
        key: "star-".concat(num)
      }, "star_half");
    } else {
      return /*#__PURE__*/React.createElement("i", {
        className: "material-icons",
        key: "star-".concat(num)
      }, "star_border");
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "minicaps"
  }, rating, " | ", usage)), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("p", {
    className: "caption"
  }, props.course.caption), /*#__PURE__*/React.createElement("div", {
    className: "my-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t(_templateObject7())), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "topics-list"
  }, topicsList.map(function (topic, index) {
    return /*#__PURE__*/React.createElement("span", {
      key: "topic-".concat(index)
    }, !!index && ', ', topic);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t(_templateObject8())), /*#__PURE__*/React.createElement("div", null, props.course.provider), props.course.platform && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t(_templateObject9())), /*#__PURE__*/React.createElement("div", null, props.course.platform)), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t(_templateObject10())), /*#__PURE__*/React.createElement("div", null, availability))), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alt-cta"
  }, moreInfo && /*#__PURE__*/React.createElement("a", {
    href: props.course.course_page_url,
    target: "_blank",
    className: "p2pu-btn dark secondary"
  }, t(_templateObject11())), courseLink && /*#__PURE__*/React.createElement("a", {
    href: props.course.link,
    target: "_blank",
    className: "p2pu-btn dark secondary"
  }, t(_templateObject12())), props.onSelectResult && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return props.onSelectResult(props.course);
    },
    className: "p2pu-btn dark"
  }, props.buttonText)))));
};

export default CourseCard;
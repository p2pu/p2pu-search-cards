import React, { Fragment } from 'react';
import { t, jt, ngettext, msgid } from 'ttag';
import { Card, CardTitle, CardBody } from '../Card';
import { COLOR_CLASSES } from '../utils/constants';

const CourseCard = props => {
  const {
    courseLink = false,
    moreInfo = true
  } = props;
  const availability = props.course.on_demand ? t`Always available` : t`Check availability`;

  const handleFilterClick = topic => {
    return event => {
      event.preventDefault();
      props.updateQueryParams({
        topics: [topic]
      });
    };
  };

  const topicsList = props.course.topics.slice(0, 5).map(topic => {
    return /*#__PURE__*/React.createElement("a", {
      className: "tag",
      onClick: handleFilterClick(topic),
      href: ""
    }, topic);
  });
  const colorClass = COLOR_CLASSES[props.course.id % COLOR_CLASSES.length];
  const rating_number = /*#__PURE__*/React.createElement("strong", null, props.course.total_ratings);
  let rating = jt`${rating_number} ratings`;

  if (props.course.total_ratings == 1) {
    rating = jt`${rating_number} rating`;
  }

  let usage_number = /*#__PURE__*/React.createElement("strong", null, props.course.learning_circles);
  let usage = jt`Used in ${usage_number} learning circles`;

  if (props.course.learning_circles == 1) {
    usage = jt`Used in ${usage_number} learning circle`;
  }

  return /*#__PURE__*/React.createElement(Card, {
    classes: `alt ${props.classes}`,
    colorClass: colorClass,
    id: props.id
  }, /*#__PURE__*/React.createElement(CardTitle, null, props.course.title), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("div", {
    className: `stars mb-2 ${props.course.total_ratings == 0 && 'disabled'}`
  }, [1, 2, 3, 4, 5].map(num => {
    const rating = Math.round(props.course.overall_rating * 2) / 2;

    if (rating >= num) {
      return /*#__PURE__*/React.createElement("i", {
        className: "material-icons",
        key: `star-${num}`
      }, "star");
    } else if (rating == num - 0.5) {
      return /*#__PURE__*/React.createElement("i", {
        className: "material-icons",
        key: `star-${num}`
      }, "star_half");
    } else {
      return /*#__PURE__*/React.createElement("i", {
        className: "material-icons",
        key: `star-${num}`
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
  }, t`Topics`), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "topics-list"
  }, topicsList.map((topic, index) => {
    return /*#__PURE__*/React.createElement("span", {
      key: index
    }, !!index && ', ', topic);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t`Provider`), /*#__PURE__*/React.createElement("div", null, props.course.provider), props.course.platform && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t`Platform`), /*#__PURE__*/React.createElement("div", null, props.course.platform)), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t`Access`), /*#__PURE__*/React.createElement("div", null, availability))), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alt-cta"
  }, moreInfo && /*#__PURE__*/React.createElement("a", {
    href: props.course.course_page_url,
    target: "_blank",
    className: "p2pu-btn dark secondary"
  }, t`More details`), courseLink && /*#__PURE__*/React.createElement("a", {
    href: props.course.link,
    target: "_blank",
    className: "p2pu-btn dark secondary"
  }, t`Course website`), props.onSelectResult && /*#__PURE__*/React.createElement("button", {
    onClick: () => props.onSelectResult(props.course),
    className: "p2pu-btn dark"
  }, props.buttonText)))));
};

export default CourseCard;
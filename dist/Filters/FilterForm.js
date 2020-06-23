import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import TopicsFilterForm from './TopicsFilterForm';
import OrderCoursesForm from './OrderCoursesForm';
import LocationFilterForm from './LocationFilterForm';
import MeetingDaysFilterForm from './MeetingDaysFilterForm';
import LanguageFilterForm from './LanguageFilterForm';
import OerFilterForm from './OerFilterForm';

const FilterForm = props => {
  const closeFilter = () => {
    props.updateActiveFilter(null);
  };

  const openClass = props.activeFilter ? 'open' : '';

  const internalForm = () => {
    switch (props.activeFilter) {
      case 'topics':
        return /*#__PURE__*/React.createElement(TopicsFilterForm, props);

      case 'language':
        return /*#__PURE__*/React.createElement(LanguageFilterForm, _extends({}, props, {
          closeFilter: closeFilter
        }));

      case 'orderCourses':
        return /*#__PURE__*/React.createElement(OrderCoursesForm, _extends({}, props, {
          closeFilter: closeFilter
        }));

      case 'location':
        return /*#__PURE__*/React.createElement(LocationFilterForm, _extends({}, props, {
          closeFilter: closeFilter
        }));

      case 'meetingDays':
        return /*#__PURE__*/React.createElement(MeetingDaysFilterForm, props);

      case 'oer':
        return /*#__PURE__*/React.createElement(OerFilterForm, _extends({}, props, {
          closeFilter: closeFilter
        }));
    }
  };

  return /*#__PURE__*/React.createElement(OutsideClickHandler, {
    onOutsideClick: closeFilter
  }, /*#__PURE__*/React.createElement("div", {
    className: `filter-form-dropdown ${openClass}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "close",
    style: {
      textAlign: 'right',
      float: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons",
    onClick: closeFilter
  }, "close")), internalForm()));
};

export default FilterForm;
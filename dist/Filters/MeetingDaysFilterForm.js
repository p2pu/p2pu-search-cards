import React, { Component } from 'react';
import CheckboxWithLabel from '../InputFields/CheckboxWithLabel';
import { MEETING_DAYS } from '../utils/constants';

var MeetingDaysFilterForm = function MeetingDaysFilterForm(props) {
  var weekdays = props.weekdays,
      updateQueryParams = props.updateQueryParams;

  var generateChangeHandler = function generateChangeHandler(day, index) {
    return function (checkboxValue) {
      console.log('checkboxValue', checkboxValue);
      var newWeekdayList = weekdays || [];

      if (checkboxValue[day]) {
        newWeekdayList.push(index);
      } else {
        newWeekdayList = newWeekdayList.filter(function (val) {
          return val != index;
        });
      }

      updateQueryParams({
        weekdays: newWeekdayList
      });
    };
  };

  return /*#__PURE__*/React.createElement("div", null, MEETING_DAYS.map(function (day, index) {
    var checked = weekdays && weekdays.indexOf(index) !== -1;
    return /*#__PURE__*/React.createElement(CheckboxWithLabel, {
      key: index,
      classes: "col-sm-12 col-md-6 col-lg-6",
      name: day,
      value: checked || false,
      label: day,
      handleChange: generateChangeHandler(day, index)
    });
  }));
};

export default MeetingDaysFilterForm;
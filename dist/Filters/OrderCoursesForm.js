import React from 'react';
import SwitchWithLabels from '../InputFields/SwitchWithLabels';
import { COURSES_SORT_OPTIONS } from '../utils/constants';

var OrderCoursesForm = function OrderCoursesForm(props) {
  var handleChange = function handleChange(event) {
    var order = event.target.value;
    props.updateQueryParams({
      order: order
    });
    props.closeFilter();
  };

  return /*#__PURE__*/React.createElement("div", null, COURSES_SORT_OPTIONS.map(function (option) {
    var sortBy = props.order ? props.order : "title";
    var checked = sortBy == option.value;
    return /*#__PURE__*/React.createElement("div", {
      key: "order-".concat(option.value),
      className: "radio-with-label label-right col-12"
    }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "language",
      value: option.value,
      checked: checked,
      onChange: handleChange,
      style: {
        marginRight: "1rem"
      }
    }), option.label));
  }));
};

export default OrderCoursesForm;
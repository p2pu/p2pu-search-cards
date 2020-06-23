import React from 'react';
import SwitchWithLabels from '../InputFields/SwitchWithLabels';
import { COURSES_SORT_OPTIONS } from '../utils/constants';

const OrderCoursesForm = props => {
  const handleChange = event => {
    const order = event.target.value;
    props.updateQueryParams({
      order
    });
    props.closeFilter();
  };

  return /*#__PURE__*/React.createElement("div", null, COURSES_SORT_OPTIONS.map(option => {
    const sortBy = props.order ? props.order : "title";
    const checked = sortBy == option.value;
    return /*#__PURE__*/React.createElement("div", {
      key: `order-${option.value}`,
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
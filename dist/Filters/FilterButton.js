import React from 'react';
import { t } from 'ttag';

const Filter = ({
  filter,
  active,
  updateActiveFilter,
  label = null
}) => {
  const filterNames = {
    'location': t`Location`,
    'language': t`Language`,
    'topics': t`Topics`,
    'meetingDays': t`Meeting Day(s)`,
    'orderCourses': t`Sort by`,
    'oer': t`OER mode`
  };
  const iconName = active ? 'remove' : 'add';
  const activeClass = active ? 'active' : '';

  const handleClick = () => {
    const newValue = active ? '' : filter;
    updateActiveFilter(newValue);
  };

  const filterLabel = label || filterNames[filter];
  return /*#__PURE__*/React.createElement("div", {
    className: `filter ${activeClass}`
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
import React from 'react';
import Masonry from 'react-masonry-css';
import { t } from "ttag";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LearningCircleCard from './LearningCircleCard.jsx';
import 'react-tabs/style/react-tabs.css';
var defaultBreakpoints = {
  "default": 3,
  992: 2,
  768: 1
};

var BrowseLearningCircles = function BrowseLearningCircles(_ref) {
  var results = _ref.results,
      onSelectResult = _ref.onSelectResult,
      locale = _ref.locale,
      columnBreakpoints = _ref.columnBreakpoints,
      resultsCount = _ref.resultsCount,
      signupOpenCount = _ref.signupOpenCount,
      signupClosedCount = _ref.signupClosedCount,
      resultsTab = _ref.resultsTab,
      updateResultsTab = _ref.updateResultsTab;
  console.log(results);
  return /*#__PURE__*/React.createElement(Tabs, {
    selectedIndex: resultsTab,
    onSelect: updateResultsTab
  }, /*#__PURE__*/React.createElement(TabList, null, /*#__PURE__*/React.createElement(Tab, null, /*#__PURE__*/React.createElement("span", {
    className: "minicaps bold text-xs"
  }, "Signup open (".concat(signupOpenCount, ")"))), /*#__PURE__*/React.createElement(Tab, null, /*#__PURE__*/React.createElement("span", {
    className: "minicaps bold text-xs"
  }, "Signup closed (".concat(signupClosedCount, ")")))), /*#__PURE__*/React.createElement(TabPanel, null, /*#__PURE__*/React.createElement(Masonry, {
    breakpointCols: columnBreakpoints || defaultBreakpoints,
    className: "masonry-grid search-results row grid",
    columnClassName: "masonry-grid_column"
  }, results.map(function (circle, index) {
    return /*#__PURE__*/React.createElement(LearningCircleCard, {
      key: "learning-circle-".concat(index),
      learningCircle: circle,
      locale: locale,
      classes: "col-12 mb-5 mt-4",
      onSelectResult: onSelectResult,
      isSignupOpen: true
    });
  }))), /*#__PURE__*/React.createElement(TabPanel, null, /*#__PURE__*/React.createElement(Masonry, {
    breakpointCols: columnBreakpoints || defaultBreakpoints,
    className: "masonry-grid search-results row grid",
    columnClassName: "masonry-grid_column"
  }, results.map(function (circle, index) {
    return /*#__PURE__*/React.createElement(LearningCircleCard, {
      key: "learning-circle-".concat(index),
      learningCircle: circle,
      locale: locale,
      classes: "col-12 mb-5 mt-4",
      onSelectResult: onSelectResult,
      isSignupOpen: false
    });
  }))));
};

BrowseLearningCircles.defaultProps = {
  results: [],
  signupOpenCount: 0,
  signupClosedCount: 0,
  resultsCount: 0
};
export default BrowseLearningCircles;
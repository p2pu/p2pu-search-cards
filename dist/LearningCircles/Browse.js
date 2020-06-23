import React from 'react';
import Masonry from 'react-masonry-css';
import { t } from "ttag";
import LearningCircleCard from './LearningCircleCard.jsx';
const defaultBreakpoints = {
  default: 3,
  992: 2,
  768: 1
};

const BrowseLearningCircles = ({
  results,
  onSelectResult,
  locale,
  columnBreakpoints
}) => /*#__PURE__*/React.createElement(Masonry, {
  breakpointCols: columnBreakpoints || defaultBreakpoints,
  className: "masonry-grid search-results row grid",
  columnClassName: "masonry-grid_column"
}, results.map((circle, index) => /*#__PURE__*/React.createElement(LearningCircleCard, {
  key: `learning-circle-${index}`,
  learningCircle: circle,
  locale: locale,
  classes: "col-12 mb-5",
  onSelectResult: onSelectResult
})));

export default BrowseLearningCircles;
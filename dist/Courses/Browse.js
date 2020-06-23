import React from 'react';
import Masonry from 'react-masonry-css';
import CourseCard from './CourseCard';
import { t } from 'ttag';
const defaultBreakpoints = {
  default: 3,
  992: 2,
  768: 1
};

class BrowseCourses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      results,
      updateQueryParams,
      onSelectResult,
      columnBreakpoints
    } = this.props;
    return /*#__PURE__*/React.createElement(Masonry, {
      breakpointCols: columnBreakpoints || defaultBreakpoints,
      className: "masonry-grid search-results row grid",
      columnClassName: "masonry-grid_column"
    }, results.map((course, index) => /*#__PURE__*/React.createElement(CourseCard, {
      key: `course-card-${index}`,
      id: `course-card-${index}`,
      course: course,
      updateQueryParams: updateQueryParams,
      courseLink: this.props.courseLink,
      moreInfo: this.props.moreInfo,
      onSelectResult: onSelectResult,
      buttonText: t`Use this course`,
      classes: "col-12"
    })));
  }

}

export default BrowseCourses;
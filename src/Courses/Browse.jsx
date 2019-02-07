import React from 'react'
import Masonry from 'react-masonry-component'
import CourseCard from './CourseCard'

class BrowseCourses extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    // if (prevProps != this.props) {
    //   $('[data-toggle="tooltip"]').tooltip();
    // }
  }

  render() {
    const { results, updateQueryParams, onSelectResult } = this.props;

    return (
      <Masonry className={"search-results row grid"}>
        {
          results.map((course, index) => (
            <CourseCard
              key={`course-card-${index}`}
              id={`course-card-${index}`}
              course={course}
              updateQueryParams={updateQueryParams}
              onSelectResult={onSelectResult}
              buttonText='Use this course'
            />
          ))
        }
      </Masonry>
    );
  }
}

export default BrowseCourses

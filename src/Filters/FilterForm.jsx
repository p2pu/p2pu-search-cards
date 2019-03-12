import React from 'react'
import TopicsFilterForm from './TopicsFilterForm'
import OrderCoursesForm from './OrderCoursesForm'
import LocationFilterForm from './LocationFilterForm'
import MeetingDaysFilterForm from './MeetingDaysFilterForm'
import LanguageFilterForm from './LanguageFilterForm'
import OerFilterForm from './OerFilterForm'


const FilterForm = (props) => {
  const closeFilter = () => { props.updateActiveFilter(null) };
  const openClass = props.activeFilter ? 'open' : '';

  const internalForm = () => {
    switch (props.activeFilter) {
      case 'topics':
      return <TopicsFilterForm {...props} />;
      case 'language':
      return <LanguageFilterForm {...props} closeFilter={closeFilter} />;
      case 'orderCourses':
      return <OrderCoursesForm { ...props} closeFilter={closeFilter} />;
      case 'location':
      return <LocationFilterForm { ...props} closeFilter={closeFilter} />;
      case 'meetingDays':
      return <MeetingDaysFilterForm { ...props} />;
      case 'oer':
      return <OerFilterForm { ...props} closeFilter={closeFilter} />;
    }
  }

  return(
    <div className={`filter-form-dropdown ${openClass}`}>
      <div className='close' style={{ textAlign: 'right', float: 'none', cursor: 'pointer' }}>
        <i className="material-icons" onClick={closeFilter}>close</i>
      </div>
      {internalForm()}
    </div>
  )
}

export default FilterForm;

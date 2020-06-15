import React, { Component } from 'react'

import CheckboxWithLabel from '../InputFields/CheckboxWithLabel'
import { MEETING_DAYS } from '../utils/constants'

const MeetingDaysFilterForm = props => {
  const { weekdays, updateQueryParams } = props;

  const generateChangeHandler = (day, index) => {
    return (checkboxValue) => {
      console.log('checkboxValue', checkboxValue)
      let newWeekdayList = weekdays || [];

      if (checkboxValue[day]) {
        newWeekdayList.push(index)
      } else {
        newWeekdayList = newWeekdayList.filter( val => val != index);
      }

      updateQueryParams({ weekdays: newWeekdayList})
    }
  }

  return(
    <div>
      {
        MEETING_DAYS.map((day, index) => {
          const checked = weekdays && (weekdays.indexOf(index) !== -1);
          return(
            <CheckboxWithLabel
              key={index}
              classes='col-sm-12 col-md-6 col-lg-6'
              name={day}
              value={checked || false}
              label={day}
              handleChange={generateChangeHandler(day, index)}
            />
          )
        })
      }
    </div>
  )
}

export default MeetingDaysFilterForm
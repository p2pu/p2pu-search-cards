import React, { Component } from 'react'
import pull from 'lodash/pull'

import { CheckboxWithLabel } from 'p2pu-input-fields'
import { MEETING_DAYS } from '../utils/constants'

export default class MeetingDaysFilterForm extends Component {
  constructor(props) {
    super(props)
    this.generateChangeHandler = (day, index) => this._generateChangeHandler(day, index);
  }

  _generateChangeHandler(day, index) {
    return (checkboxValue) => {
      let newWeekdayList = this.props.weekdays || [];

      if (checkboxValue[day]) {
        newWeekdayList.push(index)
      } else {
        newWeekdayList = pull(newWeekdayList, index);
      }

      this.props.updateQueryParams({ weekdays: newWeekdayList})
    }
  }

  render() {
    return(
      <div>
        {
          MEETING_DAYS.map((day, index) => {
            const checked = this.props.weekdays && (this.props.weekdays.indexOf(index) !== -1);
            return(
              <CheckboxWithLabel
                key={index}
                classes='col-sm-12 col-md-6 col-lg-6'
                name={day}
                value={index}
                label={day}
                checked={checked}
                handleChange={this.generateChangeHandler(day, index)}
              />
            )
          })
        }
      </div>
    )
  }
}

import React from 'react'

import SwitchWithLabels from '../input-fields/SwitchWithLabels'
import { COURSES_SORT_OPTIONS } from '../utils/constants'


const OrderCoursesForm = (props) => {

  const handleChange = event => {
    const order = event.target.value;
    props.updateQueryParams({ order })
    props.closeFilter()
  }

  return(
    <div>
      {
        COURSES_SORT_OPTIONS.map((option) => {
          const sortBy = props.order ? props.order : "title";
          const checked = sortBy == option.value;

          return(
            <div key={`order-${option.value}`} className="radio-with-label label-right col-12">
              <label>
                <input
                  type="radio"
                  name="language"
                  value={option.value}
                  checked={checked}
                  onChange={handleChange}
                  style={{ marginRight: "1rem" }}
                />
                { option.label }
              </label>
            </div>
          )
        })
      }
    </div>
  )
}

export default OrderCoursesForm;

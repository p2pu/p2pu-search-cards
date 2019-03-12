import React from 'react'
import { SwitchWithLabels } from 'p2pu-input-fields'

import { COURSES_SORT_OPTIONS } from '../utils/constants'


const OrderCoursesForm = (props) => {

  const handleChange = event => {
    const order = event.target.value;
    props.updateQueryParams({ order })
  }

  return(
    <div>
      {
        COURSES_SORT_OPTIONS.map((option) => {
          const checked = props.order == option.value;

          return(
            <div key={`order-${option.value}`} className="radio-with-label label-right col-sm-12 col-md-6 col-lg-6">
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

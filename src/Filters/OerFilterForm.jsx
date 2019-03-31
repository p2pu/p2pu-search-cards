import React from 'react'
import { SwitchWithLabels } from 'p2pu-input-fields'


const OerFilterForm = (props) => {
  const formValues = {
    true: "Only open educational resources (OER)",
    false: "All courses"
  }

  const handleSelect = (oer) => {
    props.updateQueryParams({ oer })
  }

  return(
    <SwitchWithLabels
      name="order-courses"
      labelRight={formValues.true}
      labelLeft={formValues.false}
      onChange={handleSelect}
      defaultChecked={Boolean(props.oer)}
    />
  )
}

export default OerFilterForm;
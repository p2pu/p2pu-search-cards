import React from 'react'
import { t } from 'ttag';
import SwitchWithLabels from '../InputFields/SwitchWithLabels'


const OerFilterForm = (props) => {
  const formValues = {
    true: t`Only open educational resources (OER)`,
    false: t`All courses`
  }

  const handleChange = (selected) => {
    props.updateQueryParams(selected)
  }

  return(
    <SwitchWithLabels
      name="oer"
      trueLabel={formValues.true}
      falseLabel={formValues.false}
      handleChange={handleChange}
      value={Boolean(props.oer)}
      label="What types of courses do you want to see?"
    />
  )
}

export default OerFilterForm;

import React from 'react'

import Done from "@material-ui/icons/Done"
import DoneAll from "@material-ui/icons/DoneAll"

const UsageBadge = ({ number, id }) => {
  const display = number > 0
  const pluralizedText = number === 1 ? 'learning circle' : 'learning circles';
  const Icon = number === 1 ? Done : DoneAll;
  const tooltipText = `Used by ${number} ${pluralizedText}`;

  if (display) {
    return (
      <div className='usage-badge' data-toggle="tooltip" data-placement="bottom" title={tooltipText}>
        <div className='text'>
          <Icon />{number}
        </div>
      </div>
    );
  } else {
    return null
  }
}

export default UsageBadge

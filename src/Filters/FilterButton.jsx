import React from 'react'

const Filter = ({filter, active, updateActiveFilter, label=null}) => {
  const filterNames = {
    'location': 'Location',
    'language': 'Language',
    'topics': 'Topics',
    'meetingDays': 'Meeting Day(s)',
    'orderCourses': 'Sort by',
    'oer': 'OER mode'
  }

  const iconName = active ? 'remove' : 'add'

  const activeClass = active ? 'active' : ''

  const handleClick = () => {
    const newValue = active ? '' : filter
    updateActiveFilter(newValue)
  }

  const filterLabel = label || filterNames[filter];

  return(
    <div className={`filter ${activeClass}`} >
      <button className='p2pu-btn light with-outline' onClick={handleClick}>
        <span style={{ display: 'flex',flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          {filterLabel}
        </span>
      </button>
    </div>
  )
}

export default Filter;
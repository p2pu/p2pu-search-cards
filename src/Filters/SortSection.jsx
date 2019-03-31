import React, { Component } from 'react'
import FilterButton from './FilterButton'
import FilterForm from './FilterForm'
import { COURSES_SORT_OPTIONS } from '../utils/constants'

export default class FilterSection extends Component {
  constructor(props) {
    super(props)
    this.state = { activeFilter: '' };
    this.updateActiveFilter = (filter) => this._updateActiveFilter(filter);
  }

  _updateActiveFilter(filter) {
    this.setState({ activeFilter: filter })
  }

  buttonLabel = filter => {
    if (filter === "orderCourses") {
      const sortBy = this.props.order || "title";
      const sortOption = COURSES_SORT_OPTIONS.find(opt => opt.value === sortBy)
      return <span>{`${sortOption["label"]}`}&nbsp;&nbsp;▾</span>
    }
  }

  render() {
    return(
      <div className="filter-section">
        <div className='label'>
          Sort by
        </div>
        <div className='filters-bar'>
          {
            this.props.sortCollection.map((filter, index) => {
              const isActive = this.state.activeFilter === filter;
              const sortLabel = this.buttonLabel(filter);

              return(
                <div key={index} className='wrapper'>
                  <FilterButton
                    filter={filter}
                    active={isActive}
                    updateActiveFilter={this.updateActiveFilter}
                    label={sortLabel}
                  />
                  {
                    isActive &&
                    <FilterForm
                      activeFilter={this.state.activeFilter}
                      updateActiveFilter={this.updateActiveFilter}
                      {...this.props}
                    />
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

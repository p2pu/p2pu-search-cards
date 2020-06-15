import React from 'react';
import Search from '../src/Search/Search';
import BrowseCourses from '../src/Courses/Browse';
import { mount, shallow } from 'enzyme';
import { createWaitForElement } from 'enzyme-wait';
import waitForExpect from 'wait-for-expect'


const testProps = {
  searchSubject: 'courses',
  initialState: { languages: ['en'] },
  Browse: BrowseCourses,
  onSelectResult: (selected) => console.log(selected),
  origin: 'https://learningcircles.p2pu.org',
  NoResultsComponent: () => "No results"
}

describe('Search', () => {
  test('should render', async () => {
    const search = mount(<Search {...testProps} />)

    let searchContainer = search.find('.search-container')
    let resultsSummary = search.find('.results-summary')
    let searchResults = search.find('.search-results')

    expect(searchContainer).toBeDefined()
    expect(resultsSummary).toBeDefined()
    expect(searchResults).toBeDefined()
  })
})
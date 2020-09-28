import React from 'react'
import Masonry from 'react-masonry-component'
import { t } from "ttag";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { OPEN_TAB_TEXT, CLOSED_TAB_TEXT } from '../utils/constants'

import LearningCircleCard from './LearningCircleCard.jsx'
import 'react-tabs/style/react-tabs.css';

const BrowseLearningCircles = ({ results, onSelectResult, locale, columnBreakpoints, resultsCount, signupOpenCount, signupClosedCount, resultsTab, updateResultsTab, NoResultsComponent, showNoResultsComponent, contact, isLoading }) => {

  return (
    <Tabs selectedIndex={resultsTab} onSelect={updateResultsTab}>
      <TabList>
        <Tab><span className="minicaps bold text-xs">{`${OPEN_TAB_TEXT} (${signupOpenCount})`}</span></Tab>
        <Tab><span className="minicaps bold text-xs">{`${CLOSED_TAB_TEXT} (${signupClosedCount})`}</span></Tab>
      </TabList>
      <TabPanel>
        { !isLoading && results.length === 0 ?
          <NoResultsComponent updateResultsTab={updateResultsTab} tabIndex={resultsTab} contact={contact} /> :
          <Masonry className={"search-results row grid"}>
            {
              results.map((circle, index) => (
                <LearningCircleCard
                  key={`learning-circle-${index}`}
                  learningCircle={circle}
                  locale={locale}
                  classes="col-md-4 col-md-4 my-3"
                  onSelectResult={onSelectResult}
                  isSignupOpen={true}
                />
              ))
            }
          </Masonry>
        }
      </TabPanel>
      <TabPanel>
        { !isLoading && results.length === 0 ?
          <NoResultsComponent updateResultsTab={updateResultsTab} tabIndex={resultsTab} contact={contact} /> :
          <Masonry className={"search-results row grid"}>
            {
              results.map((circle, index) => (
                <LearningCircleCard
                  key={`learning-circle-${index}`}
                  learningCircle={circle}
                  locale={locale}
                  classes="col-md-4 my-4"
                  onSelectResult={onSelectResult}
                  isSignupOpen={false}
                />
              ))
            }
          </Masonry>
        }
      </TabPanel>
    </Tabs>
  )
}

BrowseLearningCircles.defaultProps = {
  results: [],
  signupOpenCount: 0,
  signupClosedCount: 0,
  resultsCount: 0
}


export default BrowseLearningCircles

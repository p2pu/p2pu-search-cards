import React from 'react'
import Masonry from 'react-masonry-css'
import { t } from "ttag";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import LearningCircleCard from './LearningCircleCard.jsx'
import 'react-tabs/style/react-tabs.css';

const defaultBreakpoints = {
  default: 3,
  992: 2,
  768: 1
};

const BrowseLearningCircles = ({ results, onSelectResult, locale, columnBreakpoints }) => {
  const signupOpen = []
  const signupClosed = []

  results.forEach(lc => {
    const isSignupOpen = lc.signup_open
    const isCompleted = new Date(lc.last_meeting_date) < new Date()
    if (isSignupOpen && !isCompleted) {
      signupOpen.push(lc)
    } else {
      signupClosed.push(lc)
    }
  })

  return (
    <Tabs>
      <TabList>
        <Tab><span className="minicaps bold text-xs">{`Signup open (${signupOpen.length})`}</span></Tab>
        <Tab><span className="minicaps bold text-xs">{`Signup closed (${signupClosed.length})`}</span></Tab>
      </TabList>
      <TabPanel>
        <Masonry breakpointCols={columnBreakpoints || defaultBreakpoints} className="masonry-grid search-results row grid" columnClassName="masonry-grid_column">
          {
            signupOpen.map((circle, index) => (
              <LearningCircleCard
                key={`learning-circle-${index}`}
                learningCircle={circle}
                locale={locale}
                classes="col-12 mb-5 mt-4"
                onSelectResult={onSelectResult}
              />
            ))
          }
        </Masonry>
      </TabPanel>
      <TabPanel>
        <Masonry breakpointCols={columnBreakpoints || defaultBreakpoints} className="masonry-grid search-results row grid" columnClassName="masonry-grid_column">
          {
            signupClosed.map((circle, index) => (
              <LearningCircleCard
                key={`learning-circle-${index}`}
                learningCircle={circle}
                locale={locale}
                classes="col-12 mb-5 mt-4"
                onSelectResult={onSelectResult}
              />
            ))
          }
        </Masonry>
      </TabPanel>
    </Tabs>
  )
}


export default BrowseLearningCircles

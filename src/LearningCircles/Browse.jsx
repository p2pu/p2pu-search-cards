import React from 'react'
import Masonry from 'react-masonry-component'
import { t } from "ttag";

import LearningCircleCard from './LearningCircleCard.jsx'

const BrowseLearningCircles = ({ results, onSelectResult }) => (
  <Masonry className={"search-results row grid"}>
    {
      results.map((circle, index) => (
        <LearningCircleCard
          key={`learning-circle-${index}`}
          learningCircle={circle}
          classes="col-md-4"
          onSelectResult={onSelectResult}
        />
      ))
    }
    <div className="result-item grid-item col-12 col-md-4 start-learning-circle">
      <div className="circle">
        <p>{t`Start a learning circle in your neighborhood`}</p>
        <a href="https://www.p2pu.org/en/facilitate/" className="btn p2pu-btn dark arrow"><i className="fa fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </div>
  </Masonry>
)

export default BrowseLearningCircles

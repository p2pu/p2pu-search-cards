import React from 'react'
import Masonry from 'react-masonry-css'
import { t } from "ttag";

import LearningCircleCard from './LearningCircleCard.jsx'

const breakpoints = {
  default: 3,
  992: 2,
  768: 1
};

const BrowseLearningCircles = ({ results, onSelectResult, locale }) => (
  <Masonry breakpointCols={breakpoints} className="masonry-grid search-results row grid" columnClassName="masonry-grid_column">
    {
      results.map((circle, index) => (
        <LearningCircleCard
          key={`learning-circle-${index}`}
          learningCircle={circle}
          locale={locale}
          classes="col-12 mb-5"
          onSelectResult={onSelectResult}
        />
      ))
    }
  </Masonry>
)

export default BrowseLearningCircles

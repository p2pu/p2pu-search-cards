import React from 'react'
import Masonry from 'react-masonry-component'
import { t } from "ttag";

import LearningCircleCard from './LearningCircleCard.jsx'

const BrowseLearningCircles = ({ results, onSelectResult, locale }) => (
  <Masonry className={"search-results row grid"}>
    {
      results.map((circle, index) => (
        <LearningCircleCard
          key={`learning-circle-${index}`}
          learningCircle={circle}
          locale={locale}
          classes="col-md-4"
          onSelectResult={onSelectResult}
        />
      ))
    }
  </Masonry>
)

export default BrowseLearningCircles

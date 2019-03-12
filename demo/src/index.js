import React from 'react';
import { render } from 'react-dom';

import Search from "../../src/Search/Search";
import BrowseCourses from "../../src/Courses/Browse";
import BrowseLearningCircles from "../../src/LearningCircles/Browse";

import "../../src/stylesheets/search.scss"
import "p2pu-theme/src/scss/base.scss"
import "p2pu-input-fields/dist/build.css"


class App extends React.Component {

  render() {
    const handleSelectResult = (props) => {
      console.log(props)
    }

    return(
      <Search
        searchSubject={'courses'}
        Browse={BrowseCourses}
        onSelectResult={handleSelectResult}
      />
    );
  }
}

render(<App />, document.getElementById("root"));
import React from 'react';
import { render } from 'react-dom';

import Search from "../../src/Search/Search";
import BrowseLearningCircles from "../../src/LearningCircles/Browse";
import LearningCircleSignup from "../../src/LearningCircleSignup/LearningCircleSignup";

import "../../src/stylesheets/search.scss"
import "p2pu-theme/src/scss/base.scss"


class App extends React.Component {

  constructor(props){
    super(props);
    this.handleLearningCircleSelection = this.handleLearningCircleSelection.bind(this);
    this.handleSignupDialogClose = this.handleSignupDialogClose.bind(this);
    this.state = {
      selectedLearningCircle: null,
    };
  }

  handleLearningCircleSelection(learningCircle) {
    console.log(`Clicked on ${learningCircle.url}`);
    this.setState({...this.state, selectedLearningCircle: learningCircle});
  }

  handleSignupDialogClose(learningCircle){
    this.setState({...this.state, selectedLearningCircle: null});
  }

  render() {
    return (
      <div style={{ padding: "20px"}}>
        {
          this.state.selectedLearningCircle &&
            <LearningCircleSignup
              onCancel={this.handleSignupDialogClose}
              learningCircle={this.state.selectedLearningCircle}
              signUpUrl='https://learningcircles.p2pu.org/api/signup/'
            />
        }
        <div className={this.state.selectedLearningCircle?'d-none':''}>
          <Search
            searchSubject={'learningCircles'}
            locale="en"
            onSelectResult={this.handleLearningCircleSelection}
            Browse={BrowseLearningCircles}
            origin={'http://localhost:8000'}
            contact="sharon@p2pu.org"
          />
        </div>
      </div>
    );
  }
};

render(<App />, document.getElementById("root"));

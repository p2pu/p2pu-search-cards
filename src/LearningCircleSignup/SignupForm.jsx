import React from 'react';
import { t, jt } from 'ttag';
import Promise from 'promise-polyfill'
import 'whatwg-fetch'
import InputWithLabel from '../input-fields/InputWithLabel';
import CheckboxWithLabel from '../input-fields/CheckboxWithLabel';
import SignupSuccess from './SignupSuccess';
import {MobileInput} from './MobileInput';

export default class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.onDataChange = this.onDataChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getError = this.getError.bind(this);

    this.state = {
      submitting: false,
      signupSuccess: false,
      name: '',
      email: '',
      goals: '',
      support: '',
      custom_question: '',
      mobile: '',
      communications_opt_in: false,
      errors: {},
    };
  }

  onSubmit() {
    // Send data to signup API
    let {
      name,
      email,
      mobile,
      goals,
      support,
      custom_question,
      consent,
      communications_opt_in,
    } = this.state;

    let data = {
      learning_circle: this.props.learningCircle.id,
      name,
      email,
      mobile,
      consent,
      communications_opt_in,
      signup_questions: {
        goals, support, custom_question,
      },
    };

    this.setState({...this.state, submitting: true, errors: {} });
    fetch(this.props.signUpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json()).then( json => {
      // check respose code
      if (json.status == 'created'){
        console.log('Signed up!');
        this.setState({...this.state, submitting: false, signupSuccess: true });
        // TODO this.props.onSignupSuccess;
      } else {
        console.log('Error, signup failed: ' + JSON.stringify(json));
        this.setState({...this.state, submitting: false, errors: json.errors });
      }
    }).catch(error => {
      console.log('Error: something went wrong with the request');
      // check error
      this.setState({...this.state, submitting: false });
    });
  }

  getError(fieldName){
    if (this.state.errors && this.state.errors[fieldName]){
      return this.state.errors[fieldName];
    }
    return null;
  }

  onDataChange(data, callback=null) {
    this.setState({...this.state, ...data}, callback);
  }

  render() {
    const {
      name,
      email,
      mobile,
      goals,
      support,
      custom_question,
      consent,
      communications_opt_in
    } = this.state;
    const { gdprUrl='/gdpr' } = this.props;
    let gdprLink = <a href={gdprUrl}>{t`More information.`}</a>;
    let consentLabel = jt`I consent that P2PU may process my personal data provided here for the purpose of participating in this learning circle. ${gdprLink}`;
    return (
      <div className="signup-modal">
        { this.state.signupSuccess && <SignupSuccess learningCircle={this.props.learningCircle} /> }
        { !this.state.signupSuccess &&
            <div>
              <InputWithLabel
                label={t`Name`}
                value={name}
                handleChange={this.onDataChange}
                name={'name'}
                id={'id_name'}
                errorMessage={this.getError('name')}
                required={true}
              />
              <InputWithLabel
                label={t`Email address`}
                value={email}
                handleChange={this.onDataChange}
                name='email'
                id='id_email'
                errorMessage={this.getError('email')}
                required={true}
              />
              <MobileInput
                label={t`If you'd like to receive weekly text messages reminding you of upcoming learning circle meetings, put your phone number here.`}
                value={mobile}
                handleChange={this.onDataChange}
                name={'mobile'}
                id={'id_mobile'}
                errorMessage={this.getError('mobile')}
                required={false}
              />
              <p>{t`Your number won't be shared with other participants.`}</p>
              <InputWithLabel
                label={t`Why do you want to learn this topic?`}
                name='goals'
                value={goals}
                handleChange={this.onDataChange}
                id='id_email'
                errorMessage={this.state.errors && this.state.errors.signup_questions && this.state.errors.signup_questions[0].goals}
                required={true}
              />
              <InputWithLabel
                label={t`A successful study group requires the support of all of its members. How will you help your peers achieve their goals?`}
                value={support}
                handleChange={this.onDataChange}
                name={'support'}
                id={'id_support'}
                errorMessage={this.state.errors && this.state.errors.signup_questions && this.state.errors.signup_questions[0].support}
                required={true}
              />
              { this.props.learningCircle.signup_question &&
                <InputWithLabel
                  label={this.props.learningCircle.signup_question}
                  value={custom_question}
                  handleChange={this.onDataChange}
                  name={'custom_question'}
                  id={'id_custom_questions'}
                  errorMessage={this.state.errors && this.state.errors.signup_questions && this.state.errors.signup_questions[0].custom_question}
                  required={true}
                />
              }
              <CheckboxWithLabel
                classes="d-flex"
                label={consentLabel}
                value={consent}
                handleChange={this.onDataChange}
                name='consent'
                id={'id_consent'}
                errorMessage={this.getError('consent')}
                required={false}
              />
              <CheckboxWithLabel
                classes="d-flex"
                label={t`I would like to receive emails about other future learning opportunities from P2PU.`}
                value={communications_opt_in}
                handleChange={this.onDataChange}
                name={'communications_opt_in'}
                id={'id_communications_opt_in'}
                errorMessage={''}
                required={false}
              />
              {this.state.consent && <button className="p2pu-btn blue" onClick={this.onSubmit}>{t`Sign up`}</button>}
              {!this.state.consent && <button className="p2pu-btn blue" disabled>{t`Sign up`}</button>}
            </div>
        }
        <button className="p2pu-btn blue secondary" onClick={this.props.onCancel}>{t`Back to search`}</button>
        { this.state.submitting &&
            <div className="signup-form-submitting" style={{position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', background: 'rgba(255,255,255, 0.9)', ['text-align']: 'center'}}>
              <div className="spinner-border" role="status">
                <span className="sr-only">{t`Submitting...`}</span>
              </div>
            </div>
        }
      </div>
    );
  }
};


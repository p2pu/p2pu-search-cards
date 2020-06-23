import React, { useState } from 'react';
import { t, jt } from 'ttag';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import InputWithLabel from '../InputFields/InputWithLabel';
import CheckboxWithLabel from '../InputFields/CheckboxWithLabel';
import SignupSuccess from './SignupSuccess';
import { MobileInput } from './MobileInput';

const SignupForm = props => {
  const initialState = {
    submitting: false,
    signupSuccess: false,
    name: '',
    email: '',
    goals: '',
    support: '',
    custom_question: '',
    mobile: '',
    communications_opt_in: false,
    consent: false,
    errors: {}
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = e => {
    e.preventDefault(); // Send data to signup API

    let {
      name,
      email,
      mobile,
      goals,
      support,
      custom_question,
      consent,
      communications_opt_in
    } = state;
    let data = {
      learning_circle: props.learningCircle.id,
      name,
      email,
      mobile,
      consent,
      communications_opt_in,
      signup_questions: {
        goals,
        support,
        custom_question
      }
    };
    setForm;
    setState({ ...state,
      submitting: true,
      errors: {}
    });
    fetch(props.signUpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json()).then(json => {
      // check respose code
      if (json.status == 'created') {
        console.log('Signed up!');
        setState({ ...state,
          submitting: false,
          signupSuccess: true
        }); // TODO props.onSignupSuccess;
      } else {
        console.log('Error, signup failed: ' + JSON.stringify(json));
        setState({ ...state,
          submitting: false,
          errors: json.errors
        });
      }
    }).catch(error => {
      console.log('Error: something went wrong with the request'); // check error

      setState({ ...state,
        submitting: false
      });
    });
  };

  const getError = fieldName => {
    if (state.errors && state.errors[fieldName]) {
      return state.errors[fieldName];
    }

    return null;
  };

  const onDataChange = (data, callback = null) => {
    setState({ ...state,
      ...data
    }, callback);
  };

  const {
    name,
    email,
    mobile,
    goals,
    support,
    custom_question,
    consent,
    communications_opt_in
  } = state;
  const {
    gdprUrl = '/gdpr'
  } = props;
  let gdprLink = /*#__PURE__*/React.createElement("a", {
    href: gdprUrl,
    key: "gdprLink"
  }, t`More information.`);
  let consentLabel = jt`I consent that P2PU may process my personal data provided here for the purpose of participating in this learning circle. ${gdprLink}`;
  return /*#__PURE__*/React.createElement("form", {
    className: "signup-modal",
    onSubmit: handleSubmit
  }, state.signupSuccess && /*#__PURE__*/React.createElement(SignupSuccess, {
    learningCircle: props.learningCircle
  }), !state.signupSuccess && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t`Name`,
    value: name,
    handleChange: onDataChange,
    name: 'name',
    id: 'id_name',
    errorMessage: getError('name'),
    required: true
  }), /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t`Email address`,
    value: email,
    handleChange: onDataChange,
    type: "email",
    name: "email",
    id: "id_email",
    errorMessage: getError('email'),
    required: true
  }), /*#__PURE__*/React.createElement(MobileInput, {
    label: t`If you'd like to receive weekly text messages reminding you of upcoming learning circle meetings, put your phone number here.`,
    value: mobile,
    handleChange: onDataChange,
    name: 'mobile',
    id: 'id_mobile',
    errorMessage: getError('mobile'),
    required: false
  }), /*#__PURE__*/React.createElement("p", null, t`Your number won't be shared with other participants.`), /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t`Why do you want to learn this topic?`,
    name: "goals",
    value: goals,
    handleChange: onDataChange,
    id: "id_email",
    errorMessage: state.errors && state.errors.signup_questions && state.errors.signup_questions[0].goals,
    required: true
  }), /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t`A successful study group requires the support of all of its members. How will you help your peers achieve their goals?`,
    value: support,
    handleChange: onDataChange,
    name: 'support',
    id: 'id_support',
    errorMessage: state.errors && state.errors.signup_questions && state.errors.signup_questions[0].support,
    required: true
  }), props.learningCircle.signup_question && /*#__PURE__*/React.createElement(InputWithLabel, {
    label: props.learningCircle.signup_question,
    value: custom_question,
    handleChange: onDataChange,
    name: 'custom_question',
    id: 'id_custom_questions',
    errorMessage: state.errors && state.errors.signup_questions && state.errors.signup_questions[0].custom_question,
    required: true
  }), /*#__PURE__*/React.createElement(CheckboxWithLabel, {
    name: "consent",
    label: consentLabel,
    value: consent,
    handleChange: onDataChange,
    errorMessage: getError('consent'),
    required: true
  }), /*#__PURE__*/React.createElement(CheckboxWithLabel, {
    classes: "d-flex",
    label: t`I would like to receive emails about other future learning opportunities from P2PU.`,
    value: communications_opt_in,
    handleChange: onDataChange,
    name: 'communications_opt_in',
    id: 'id_communications_opt_in',
    errorMessage: '',
    required: false
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn p2pu-btn blue",
    type: "submit"
  }, t`Sign up`)), /*#__PURE__*/React.createElement("button", {
    className: "p2pu-btn blue secondary",
    onClick: props.onCancel
  }, t`Back to search`), state.submitting && /*#__PURE__*/React.createElement("div", {
    className: "signup-form-submitting",
    style: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255, 0.9)',
      ['text-align']: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner-border",
    role: "status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, t`Submitting...`))));
};

export default SignupForm;
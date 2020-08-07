import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function _templateObject12() {
  var data = _taggedTemplateLiteral(["Submitting..."]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Back to search"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Sign up"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["I would like to receive emails about other future learning opportunities from P2PU."]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["A successful study group requires the support of all of its members. How will you help your peers achieve their goals?"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["Why do you want to learn this topic?"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["Your number won't be shared with other participants."]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["If you'd like to receive weekly text messages reminding you of upcoming learning circle meetings, put your phone number here."]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Email address"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Name"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["I consent that P2PU may process my personal data provided here for the purpose of participating in this learning circle."]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["More information."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { t, jt } from 'ttag';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';
import InputWithLabel from '../InputFields/InputWithLabel';
import CheckboxWithLabel from '../InputFields/CheckboxWithLabel';
import MobileInput from '../InputFields/MobileInput';
import SignupSuccess from './SignupSuccess';

var SignupForm = function SignupForm(props) {
  var initialState = {
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

  var _useState = useState(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault(); // Send data to signup API

    var name = state.name,
        email = state.email,
        mobile = state.mobile,
        goals = state.goals,
        support = state.support,
        custom_question = state.custom_question,
        consent = state.consent,
        communications_opt_in = state.communications_opt_in;
    var data = {
      learning_circle: props.learningCircle.id,
      name: name,
      email: email,
      mobile: mobile,
      consent: consent,
      communications_opt_in: communications_opt_in,
      signup_questions: {
        goals: goals,
        support: support,
        custom_question: custom_question
      }
    };
    setState(_objectSpread(_objectSpread({}, state), {}, {
      submitting: true,
      errors: {}
    }));
    fetch(props.signUpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function (resp) {
      return resp.json();
    }).then(function (json) {
      // check respose code
      if (json.status == 'created') {
        console.log('Signed up!');
        setState(_objectSpread(_objectSpread({}, state), {}, {
          submitting: false,
          signupSuccess: true
        })); // TODO props.onSignupSuccess;
      } else {
        console.log('Error, signup failed: ' + JSON.stringify(json));
        setState(_objectSpread(_objectSpread({}, state), {}, {
          submitting: false,
          errors: json.errors
        }));
      }
    })["catch"](function (error) {
      console.log('Error: something went wrong with the request'); // check error

      setState(_objectSpread(_objectSpread({}, state), {}, {
        submitting: false
      }));
    });
  };

  var getError = function getError(fieldName) {
    if (state.errors && state.errors[fieldName]) {
      return state.errors[fieldName];
    }

    return null;
  };

  var onDataChange = function onDataChange(data) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    setState(_objectSpread(_objectSpread({}, state), data), callback);
  };

  var name = state.name,
      email = state.email,
      mobile = state.mobile,
      goals = state.goals,
      support = state.support,
      custom_question = state.custom_question,
      consent = state.consent,
      communications_opt_in = state.communications_opt_in;
  var _props$gdprUrl = props.gdprUrl,
      gdprUrl = _props$gdprUrl === void 0 ? '/gdpr' : _props$gdprUrl;
  var gdprLink = /*#__PURE__*/React.createElement("a", {
    href: gdprUrl,
    key: "gdprLink"
  }, t(_templateObject()));
  var consentLabel = t(_templateObject2());
  return /*#__PURE__*/React.createElement("form", {
    className: "signup-modal",
    onSubmit: handleSubmit
  }, state.signupSuccess && /*#__PURE__*/React.createElement(SignupSuccess, {
    learningCircle: props.learningCircle
  }), !state.signupSuccess && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t(_templateObject3()),
    value: name,
    handleChange: onDataChange,
    name: 'name',
    id: 'id_name',
    errorMessage: getError('name'),
    required: true
  }), /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t(_templateObject4()),
    value: email,
    handleChange: onDataChange,
    type: "email",
    name: "email",
    id: "id_email",
    errorMessage: getError('email'),
    required: true
  }), /*#__PURE__*/React.createElement(MobileInput, {
    label: t(_templateObject5()),
    value: mobile,
    handleChange: onDataChange,
    name: 'mobile',
    id: 'id_mobile',
    errorMessage: getError('mobile'),
    required: false
  }), /*#__PURE__*/React.createElement("p", null, t(_templateObject6())), /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t(_templateObject7()),
    name: "goals",
    value: goals,
    handleChange: onDataChange,
    id: "id_email",
    errorMessage: state.errors && state.errors.signup_questions && state.errors.signup_questions[0].goals,
    required: true
  }), /*#__PURE__*/React.createElement(InputWithLabel, {
    label: t(_templateObject8()),
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
    helpText: gdprLink,
    value: consent,
    handleChange: onDataChange,
    errorMessage: getError('consent'),
    required: true
  }), /*#__PURE__*/React.createElement(CheckboxWithLabel, {
    classes: "d-flex",
    label: t(_templateObject9()),
    value: communications_opt_in,
    handleChange: onDataChange,
    name: 'communications_opt_in',
    id: 'id_communications_opt_in',
    errorMessage: '',
    required: false
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn p2pu-btn blue",
    type: "submit"
  }, t(_templateObject10()))), /*#__PURE__*/React.createElement("button", {
    className: "p2pu-btn blue secondary",
    onClick: props.onCancel
  }, t(_templateObject11())), state.submitting && /*#__PURE__*/React.createElement("div", {
    className: "signup-form-submitting",
    style: _defineProperty({
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255, 0.9)'
    }, 'text-align', 'center')
  }, /*#__PURE__*/React.createElement("div", {
    className: "spinner-border",
    role: "status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, t(_templateObject12())))));
};

export default SignupForm;
import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["Thank you for signing up. We've sent you an email introducing you to your facilitator and we'll send you a reminder two days before each meeting."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import { t } from 'ttag';

var SignupSuccess = function SignupSuccess() {
  return /*#__PURE__*/React.createElement("div", {
    className: "container signup-success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/React.createElement("p", null, t(_templateObject()))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/img/library-rock.gif"
  }))));
};

export default SignupSuccess;
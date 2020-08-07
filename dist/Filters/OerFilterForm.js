import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["All courses"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Only open educational resources (OER)"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import { t } from 'ttag';
import SwitchWithLabels from '../InputFields/SwitchWithLabels';

var OerFilterForm = function OerFilterForm(props) {
  var formValues = {
    "true": t(_templateObject()),
    "false": t(_templateObject2())
  };

  var handleChange = function handleChange(selected) {
    props.updateQueryParams(selected);
  };

  return /*#__PURE__*/React.createElement(SwitchWithLabels, {
    name: "oer",
    trueLabel: formValues["true"],
    falseLabel: formValues["false"],
    handleChange: handleChange,
    value: Boolean(props.oer),
    label: "What types of courses do you want to see?"
  });
};

export default OerFilterForm;
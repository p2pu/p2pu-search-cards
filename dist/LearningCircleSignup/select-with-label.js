"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

// import SelectWithLabel as SWL from '../InputFields/SelectWithLabel';
class SelectWithLabel extends _react.default.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selected) {
    console.log(selected);
    this.props.handleChange({
      [this.props.name]: selected.value
    });
  }

  render() {
    let value_search = this.props.options.filter(({
      value,
      label
    }) => value == this.props.value);
    let value = value_search.length == 1 ? value_search[0] : null;
    return /*#__PURE__*/_react.default.createElement(SWL, {
      label: this.props.label,
      classes: this.props.classes,
      options: this.props.options,
      multi: this.props.multi,
      value: value,
      handleChange: this.handleSelect,
      placeholder: this.props.placeholder,
      isClearable: false
    });
  }

}

exports.default = SelectWithLabel;
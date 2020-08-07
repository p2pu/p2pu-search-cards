import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import slugify from 'slugify';
import InputWrapper from '../InputWrapper';
var defaultStyles = {
  preview: {
    maxWidth: '250px',
    height: 'auto'
  },
  input: {
    display: "none !important"
  },
  label: {
    borderRadius: "2em",
    textTransform: "uppercase",
    fontSize: "0.8em",
    fontFamily: "'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif",
    fontWeight: "700",
    padding: "10px 20px",
    transform: "perspective(1px) translateZ(0)",
    boxShadow: "0 0 1px transparent",
    position: "relative",
    transition: "color 0.3s linear",
    display: "inline-block",
    margin: '2px',
    background: "#515665",
    border: "2px solid #515665",
    color: "#fff",
    marginRight: '6px'
  }
};

var ImageUploader = /*#__PURE__*/function (_Component) {
  _inherits(ImageUploader, _Component);

  var _super = _createSuper(ImageUploader);

  function ImageUploader(props) {
    var _this;

    _classCallCheck(this, ImageUploader);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "saveImage", function (opts) {
      var url = opts.url;
      var data = opts.data;
      var config = opts.config;
      axios({
        url: url,
        data: data,
        config: config,
        method: 'post',
        responseType: 'json'
      }).then(function (res) {
        if (res.data.errors) {
          return opts.onError(res.data);
        }

        opts.onSuccess(res.data);
      })["catch"](function (err) {
        console.log(err);
        opts.onFail(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var url = _this.props.imageUploadUrl;
      var file = e.currentTarget.files[0];
      var filename = slugify(file.name);
      var data = new FormData();
      data.append('image', file, filename);

      _this.setState({
        file: file
      });

      var onSuccess = function onSuccess(data) {
        _this.setState({
          image: data.image_url
        });

        _this.props.handleChange(_defineProperty({}, _this.props.name, data.image_url));
      };

      var onError = function onError(data) {
        console.log(data.errors);

        _this.props.handleChange(_defineProperty({}, _this.props.name, null));
      };

      var onFail = function onFail(err) {
        console.log(err);
      };

      var config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      var opts = {
        url: url,
        data: data,
        config: config,
        onSuccess: onSuccess,
        onError: onError,
        onFail: onFail
      };

      _this.saveImage(opts);
    });

    _this.state = {
      image: _this.props.image,
      file: null
    };
    return _this;
  }

  _createClass(ImageUploader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          name = _this$props.name,
          value = _this$props.value,
          required = _this$props.required,
          disabled = _this$props.disabled,
          errorMessage = _this$props.errorMessage,
          helpText = _this$props.helpText,
          labelStyles = _this$props.labelStyles,
          inputStyles = _this$props.inputStyles,
          imgStyles = _this$props.imgStyles,
          acceptedMimetypes = _this$props.acceptedMimetypes,
          buttonText = _this$props.buttonText,
          classes = _this$props.classes,
          handleChange = _this$props.handleChange,
          id = _this$props.id,
          imageUploadUrl = _this$props.imageUploadUrl,
          rest = _objectWithoutProperties(_this$props, ["label", "name", "value", "required", "disabled", "errorMessage", "helpText", "labelStyles", "inputStyles", "imgStyles", "acceptedMimetypes", "buttonText", "classes", "handleChange", "id", "imageUploadUrl"]);

      var _this$state = this.state,
          image = _this$state.image,
          file = _this$state.file;
      return /*#__PURE__*/React.createElement(InputWrapper, {
        label: label,
        name: name,
        id: id,
        required: required,
        disabled: disabled,
        errorMessage: errorMessage,
        helpText: helpText,
        classes: classes
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
        htmlFor: "image-uploader",
        className: "btn p2pu-btn dark",
        style: _objectSpread(_objectSpread({}, defaultStyles.label), labelStyles)
      }, buttonText, /*#__PURE__*/React.createElement("input", _extends({
        className: "image-upload form-control hidden",
        type: "file",
        name: "image-uploader",
        id: "image-uploader",
        required: required,
        disabled: disabled,
        onChange: this.onChange,
        style: _objectSpread(_objectSpread({}, defaultStyles.input), inputStyles),
        hidden: true,
        accept: acceptedMimetypes
      }, rest))), file ? /*#__PURE__*/React.createElement("span", null, file.name) : /*#__PURE__*/React.createElement("span", null, "No file selected"), image && /*#__PURE__*/React.createElement("div", {
        className: "image-preview",
        style: {
          marginTop: '10px'
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: image,
        alt: "Image preview",
        style: _objectSpread(_objectSpread({}, defaultStyles.preview), imgStyles)
      }))));
    }
  }]);

  return ImageUploader;
}(Component);

export { ImageUploader as default };
ImageUploader.propTypes = {
  imageUploadUrl: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  image: PropTypes.string,
  imgStyles: PropTypes.object,
  labelStyles: PropTypes.object,
  inputStyles: PropTypes.object,
  acceptedMimetypes: PropTypes.string,
  buttonText: PropTypes.string
};
ImageUploader.defaultProps = {
  handleChange: function handleChange(imgUrl) {
    return "Implement a function to save image ".concat(imgUrl);
  },
  acceptedMimetypes: "image/*",
  buttonText: 'Choose file',
  imageUploadUrl: "https://learningcircles.p2pu.org/api/upload_image/"
};
import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _templateObject() {
  var data = _taggedTemplateLiteral(["There are no active learning circles right now."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { t } from 'ttag';
import queryString from 'query-string';
import SearchAndFilter from './SearchAndFilter';
import SearchTags from './SearchTags';
import { SEARCH_PROPS, API_ENDPOINTS } from '../utils/constants';
import ApiHelper from '../utils/apiHelper';
var SIGNUP_BY_TAB = ['open', 'closed'];

var Search = /*#__PURE__*/function (_Component) {
  _inherits(Search, _Component);

  var _super = _createSuper(Search);

  function Search(props) {
    var _this;

    _classCallCheck(this, Search);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "setInitialState", function () {
      var defaults = {
        searchResults: [],
        totalResults: 0,
        distance: 50,
        useMiles: true,
        limit: 21,
        offset: 0,
        isLoading: false,
        hasMoreResults: false,
        appendResults: false,
        resultsTab: 0,
        // open for signup
        signup: 'open'
      };
      var parsedParams = queryString.parse(window.location.search, {
        arrayFormat: 'comma'
      });
      var arrayItems = API_ENDPOINTS[_this.props.searchSubject].arrayItems;
      arrayItems.forEach(function (term) {
        if (parsedParams[term] && typeof parsedParams[term] === "string") {
          parsedParams[term] = [parsedParams[term]];
        }
      });
      return _objectSpread(_objectSpread(_objectSpread({}, defaults), _this.props.initialState), parsedParams);
    });

    _defineProperty(_assertThisInitialized(_this), "updateURL", function (params) {
      var searchParams = API_ENDPOINTS[_this.props.searchSubject].searchParams;
      var privateParams = API_ENDPOINTS[_this.props.searchSubject].privateParams;
      var allowedParams = Object.keys(_this.state).filter(function (key) {
        return searchParams.includes(key) && !privateParams.includes(key);
      }).reduce(function (obj, key) {
        return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, _this.state[key]));
      }, {});
      var query = queryString.stringify(allowedParams, {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: 'comma'
      });
      window.history.replaceState(allowedParams, document.title, "".concat(window.location.pathname, "?").concat(query));
    });

    _defineProperty(_assertThisInitialized(_this), "updateResultsTab", function (tabIndex) {
      _this.updateQueryParams({
        resultsTab: tabIndex,
        signup: tabIndex === 0 ? 'open' : 'closed'
      });
    });

    _this.initialState = _this.setInitialState();
    _this.state = _this.initialState;

    _this.handleChange = function (s) {
      return _this._handleChange(s);
    };

    _this.handleInputChange = function () {
      return _this._handleInputChange();
    };

    _this.handleSearchBarSubmit = function (query) {
      return _this._handleSearchBarSubmit(query);
    };

    _this.searchCallback = function (response, opts) {
      return _this._searchCallback(response, opts);
    };

    _this.updateQueryParams = function (params) {
      return _this._updateQueryParams(params);
    };

    _this.sendQuery = function (opts) {
      return _this._sendQuery(opts);
    };

    _this.loadInitialData = function () {
      return _this._loadInitialData();
    };

    _this.apiHelper = new ApiHelper(_this.props.searchSubject, _this.props.origin);
    return _this;
  }

  _createClass(Search, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var scrollContainer = this.props.scrollContainer;
      var scrollContainerEl = scrollContainer ? document.querySelector(scrollContainer) : document.body;
      var getScrollTop = scrollContainer ? function () {
        return scrollContainerEl.scrollTop;
      } : function () {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      };

      scrollContainerEl.onscroll = function () {
        var _this2$state = _this2.state,
            isLoading = _this2$state.isLoading,
            hasMoreResults = _this2$state.hasMoreResults;

        if (isLoading || !hasMoreResults) {
          return;
        }

        var scrollTop = getScrollTop();
        var scrollHeight = document.querySelector(".search-results") && document.querySelector(".search-results").scrollHeight || document.body.scrollHeight;
        var clientHeight = window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
          _this2.updateQueryParams({
            offset: _this2.state.searchResults.length,
            appendResults: true
          });
        }
      };

      this.loadInitialData();
    }
  }, {
    key: "_loadInitialData",
    value: function _loadInitialData() {
      this.sendQuery({
        initialQuery: true
      });
    }
  }, {
    key: "_sendQuery",
    value: function _sendQuery() {
      var _this3 = this;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.setState({
        isLoading: true
      }, function () {
        var params = _this3.state;

        var options = _objectSpread({
          params: params,
          callback: _this3.searchCallback
        }, opts);

        _this3.apiHelper.fetchResource(options);
      });
    }
  }, {
    key: "_updateQueryParams",
    value: function _updateQueryParams(params) {
      var _this4 = this;

      this.setState(params, function () {
        _this4.sendQuery();

        _this4.updateURL();
      });
    }
  }, {
    key: "_handleChange",
    value: function _handleChange(selected) {
      var query = selected ? selected.label : selected;
      this.props.searchByLocation(query);
      this.setState({
        value: selected
      });
    }
  }, {
    key: "_handleInputChange",
    value: function _handleInputChange() {
      this.props.clearResults();
    }
  }, {
    key: "_searchCallback",
    value: function _searchCallback(response, opts) {
      var results = this.state.appendResults ? this.state.searchResults.concat(response.items) : response.items;
      this.setState({
        searchResults: results,
        currentQuery: opts.params,
        totalResults: response.count,
        offset: 0,
        isLoading: false,
        appendResults: false,
        hasMoreResults: response.count > 0 && results.length < response.count,
        initialQuery: opts.initialQuery,
        signupOpenCount: response.signup_open_count,
        signupClosedCount: response.signup_closed_count
      });
    }
  }, {
    key: "render",
    value: function render() {
      var filterCollection = SEARCH_PROPS[this.props.searchSubject].filters;
      var sortCollection = SEARCH_PROPS[this.props.searchSubject].sort;
      var placeholder = SEARCH_PROPS[this.props.searchSubject].placeholder;
      var resultsSubtitle = SEARCH_PROPS[this.props.searchSubject].resultsSubtitle;
      var _this$props = this.props,
          Browse = _this$props.Browse,
          NoResultsComponent = _this$props.NoResultsComponent;
      var showNoResultsComponent = this.state.totalResults === 0 && this.state.initialQuery && !Boolean(window.location.search);
      return /*#__PURE__*/React.createElement("div", {
        className: "page"
      }, /*#__PURE__*/React.createElement(SearchAndFilter, _extends({
        placeholder: placeholder,
        updateQueryParams: this.updateQueryParams,
        filterCollection: filterCollection,
        sortCollection: sortCollection,
        searchSubject: this.props.searchSubject,
        order: this.props.order
      }, this.state)), showNoResultsComponent ? /*#__PURE__*/React.createElement(NoResultsComponent, null) : /*#__PURE__*/React.createElement(SearchTags, _extends({
        updateQueryParams: this.updateQueryParams
      }, this.state, this.props)), /*#__PURE__*/React.createElement(Browse, {
        results: this.state.searchResults,
        updateQueryParams: this.updateQueryParams,
        onSelectResult: this.props.onSelectResult,
        courseLink: this.props.courseLink,
        moreInfo: this.props.moreInfo,
        locale: this.props.locale,
        columnBreakpoints: this.props.columnBreakpoints,
        signupClosedCount: this.state.signupClosedCount,
        signupOpenCount: this.state.signupOpenCount,
        updateResultsTab: this.updateResultsTab
      }), this.state.isLoading && /*#__PURE__*/React.createElement("div", {
        className: "loader"
      }));
    }
  }]);

  return Search;
}(Component);

export { Search as default };
Search.defaultProps = {
  NoResultsComponent: function NoResultsComponent() {
    return /*#__PURE__*/React.createElement("p", {
      className: "my-4"
    }, t(_templateObject()));
  }
};
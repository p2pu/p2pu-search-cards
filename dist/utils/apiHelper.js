import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { API_ENDPOINTS, DEFAULT_ORIGIN } from './constants';
import jsonp from 'jsonp';
import axios from 'axios';

var ApiHelper = /*#__PURE__*/function () {
  function ApiHelper(resourceType) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_ORIGIN;

    _classCallCheck(this, ApiHelper);

    this.resourceType = resourceType;
    this.urlOrigin = origin;
    this.baseUrl = "".concat(origin).concat(API_ENDPOINTS[resourceType].baseUrl);
    this.validParams = API_ENDPOINTS[resourceType].searchParams;
  }

  _createClass(ApiHelper, [{
    key: "generateUrl",
    value: function generateUrl(params) {
      var baseUrl = this.baseUrl;
      var encodedParams = this.validParams.map(function (key) {
        var value = params[key];

        if (!!value) {
          return "".concat(key, "=").concat(encodeURIComponent(value));
        }
      });
      var queryString = encodedParams.filter(function (a) {
        return a;
      }).join('&');
      console.log('url', "".concat(baseUrl).concat(queryString));
      return "".concat(baseUrl).concat(queryString);
    }
  }, {
    key: "fetchResource",
    value: function fetchResource(opts) {
      var url = this.generateUrl(opts.params);
      jsonp(url, null, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          opts.callback(data, opts);
        }
      });
    }
  }, {
    key: "createResource",
    value: function createResource(opts) {
      var url = "".concat(this.urlOrigin).concat(API_ENDPOINTS[this.resourceType].postUrl);
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
    }
  }, {
    key: "updateResource",
    value: function updateResource(opts, id) {
      var url = "".concat(this.urlOrigin).concat(API_ENDPOINTS[this.resourceType].postUrl).concat(id, "/");
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
    }
  }]);

  return ApiHelper;
}();

export { ApiHelper as default };
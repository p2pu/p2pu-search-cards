import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["To see more results, either remove some filters or ", ""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["reset the search form"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Showing ", " of ", " result"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Within ", " ", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import { t, jt, ngettext, msgid } from 'ttag';
import { isoCodeToLangName } from '../utils/i18n';
import { MEETING_DAYS, SEARCH_SUBJECTS, COURSES_SORT_OPTIONS } from '../utils/constants';

var SearchTag = function SearchTag(_ref) {
  var value = _ref.value,
      onDelete = _ref.onDelete;
  return /*#__PURE__*/React.createElement("div", {
    className: "search-tag"
  }, value, /*#__PURE__*/React.createElement("i", {
    className: "material-icons",
    onClick: function onClick() {
      return onDelete(value);
    },
    style: {
      cursor: 'pointer'
    }
  }, "clear"));
};

var SearchTags = function SearchTags(props) {
  var generateQueryTag = function generateQueryTag() {
    if (props.q) {
      var onDelete = function onDelete(value) {
        props.updateQueryParams({
          q: null
        });
      };

      return [/*#__PURE__*/React.createElement(SearchTag, {
        key: "queryTag-0",
        value: props.q,
        onDelete: onDelete
      })];
      return [/*#__PURE__*/React.createElement("span", {
        key: "queryTagIntro"
      }, "the search query"), /*#__PURE__*/React.createElement(SearchTag, {
        key: "queryTag-0",
        value: props.q,
        onDelete: onDelete
      })];
    }
  };

  var generateTeamNameTag = function generateTeamNameTag() {
    if (props.teamName) {
      var onDelete = function onDelete(value) {
        props.updateQueryParams({
          teamName: null,
          team_id: null
        });
        document.getElementById('team-title').style.display = 'none';
        document.getElementById('search-subtitle').style.display = 'block';
      };

      var humanReadableName = decodeURIComponent(props.teamName);
      return [/*#__PURE__*/React.createElement(SearchTag, {
        key: "queryTag-0",
        value: humanReadableName,
        onDelete: onDelete
      })];
      return [/*#__PURE__*/React.createElement("span", {
        key: "queryTagIntro"
      }, "organized by"), /*#__PURE__*/React.createElement(SearchTag, {
        key: "queryTag-0",
        value: humanReadableName,
        onDelete: onDelete
      })];
    }
  };

  var generateLanguageTag = function generateLanguageTag() {
    if (props.languages && props.languages.length > 0) {
      var _onDelete = function onDelete(value) {
        var newLanguagesArray = props.languages.filter(function (v) {
          return v != value;
        });
        var languages = newLanguagesArray.length > 0 ? newLanguagesArray : null;
        props.updateQueryParams({
          languages: languages
        });
      };

      var introPhrase = props.languages.length === 1 ? 'in' : 'in';
      var languagesTagsArray = [/*#__PURE__*/React.createElement("span", {
        key: "languageTagIntro"
      }, introPhrase)];
      props.languages.map(function (item, index) {
        if (props.languages.length > 1 && index === props.languages.length - 1) {
          languagesTagsArray.push( /*#__PURE__*/React.createElement("span", {
            key: "languageTag-".concat(index + 2)
          }, "or"));
        }

        var languageName = isoCodeToLangName(item);
        languagesTagsArray.push( /*#__PURE__*/React.createElement(SearchTag, {
          value: languageName,
          key: "languageTag-".concat(index),
          onDelete: function onDelete() {
            return _onDelete(item);
          }
        }));
      });
      return languagesTagsArray;
    }
  };

  var generateOrderTag = function generateOrderTag() {
    if (props.order) {
      var onDelete = function onDelete(value) {
        props.updateQueryParams({
          order: null
        });
      };

      var order = COURSES_SORT_OPTIONS.find(function (order) {
        return order.value == props.order;
      });
      return [/*#__PURE__*/React.createElement("span", {
        key: "queryTagIntro"
      }, "sorted by "), /*#__PURE__*/React.createElement(SearchTag, {
        key: "queryTag-0",
        value: order.label,
        onDelete: onDelete
      })];
    }
  };

  var generateOerTag = function generateOerTag() {
    if (props.oer) {
      var onDelete = function onDelete(value) {
        props.updateQueryParams({
          oer: false
        });
      };

      return [/*#__PURE__*/React.createElement("span", {
        key: "queryTagIntro"
      }, "that are "), /*#__PURE__*/React.createElement(SearchTag, {
        key: "queryTag-0",
        value: "OER",
        onDelete: onDelete
      })];
    }
  };

  var generateTopicsTags = function generateTopicsTags() {
    if (props.topics && props.topics.length > 0) {
      var onDelete = function onDelete(value) {
        var newTopicsArray = props.topics.filter(function (v) {
          return v != value;
        });
        var topics = newTopicsArray.length > 0 ? newTopicsArray : null;
        props.updateQueryParams({
          topics: topics
        });
      };

      var introPhrase = props.topics.length === 1 ? 'the topic' : 'the topics';
      var topicsTagsArray = [/*#__PURE__*/React.createElement("span", {
        key: "topicTagIntro"
      }, introPhrase)];
      topicsTagsArray = []; // TODO

      props.topics.map(function (item, index) {
        if (props.topics.length > 1 && index === props.topics.length - 1) {
          topicsTagsArray.push( /*#__PURE__*/React.createElement("span", {
            key: "topicTag-".concat(index + 2)
          }, "or"));
        }

        topicsTagsArray.push( /*#__PURE__*/React.createElement(SearchTag, {
          value: item,
          key: "topicTag-".concat(index),
          onDelete: onDelete
        }));
      });
      return topicsTagsArray;
    }
  };

  var generateLocationTag = function generateLocationTag() {
    if (props.latitude && props.longitude) {
      var unit = props.useMiles ? 'miles' : 'km';
      var value = props.useMiles ? props.distance * 0.62 : props.distance;
      value = Math.round(value / 10) * 10;
      var text = t(_templateObject(), value, unit);

      var onDelete = function onDelete(value) {
        props.updateQueryParams({
          latitude: null,
          longitude: null,
          distance: 50
        });
      };

      return [/*#__PURE__*/React.createElement(SearchTag, {
        key: "locationTag-0",
        value: text,
        onDelete: onDelete
      })];
      return [/*#__PURE__*/React.createElement("span", {
        key: "locationTagIntro"
      }, "located"), /*#__PURE__*/React.createElement(SearchTag, {
        key: "locationTag-0",
        value: text,
        onDelete: onDelete
      })];
    } else if (props.city) {
      var _onDelete2 = function _onDelete2(value) {
        props.updateQueryParams({
          city: null
        });
      };

      return [/*#__PURE__*/React.createElement(SearchTag, {
        key: "locationTag-0",
        value: props.city,
        onDelete: _onDelete2
      })];
      return [/*#__PURE__*/React.createElement("span", {
        key: "locationTagIntro"
      }, "located in"), /*#__PURE__*/React.createElement(SearchTag, {
        key: "locationTag-0",
        value: props.city,
        onDelete: _onDelete2
      })];
    }
  };

  var generateMeetingDaysTags = function generateMeetingDaysTags() {
    if (props.weekdays && props.weekdays.length > 0) {
      var onDelete = function onDelete(day) {
        var dayIndex = MEETING_DAYS.indexOf(day);
        var newWeekdayArray = props.weekdays.filter(function (val) {
          return val != dayIndex;
        });
        var weekdays = newWeekdayArray.length > 0 ? newWeekdayArray : null;
        props.updateQueryParams({
          weekdays: weekdays
        });
      };

      var weekdayTagsArray = [/*#__PURE__*/React.createElement("span", {
        key: "weekdayTagIntro"
      }, "meeting on")];
      weekdayTagsArray = []; // TODO

      props.weekdays.map(function (dayIndex, index) {
        var weekdayName = MEETING_DAYS[dayIndex];

        if (props.weekdays.length > 1 && index === props.weekdays.length - 1) {
          weekdayTagsArray.push( /*#__PURE__*/React.createElement("span", {
            key: "weekdayTag-".concat(index + 2)
          }, "or"));
        }

        weekdayTagsArray.push( /*#__PURE__*/React.createElement(SearchTag, {
          value: weekdayName,
          key: "weekdatTag-".concat(index),
          onDelete: onDelete
        }));
      });
      return weekdayTagsArray;
    }
  };

  var generateTagsPhrase = function generateTagsPhrase(tag) {
    switch (tag) {
      case 'q':
        return generateQueryTag();

      case 'topics':
        return generateTopicsTags();

      case 'location':
        return generateLocationTag();

      case 'meetingDays':
        return generateMeetingDaysTags();

      case 'teamName':
        return generateTeamNameTag();

      case 'language':
        return generateLanguageTag();

      case 'order':
        return generateOrderTag();

      case 'oer':
        return generateOerTag();
    }
  };

  var generateSearchSummary = function generateSearchSummary() {
    var searchSummaryItems = [];
    var forSearchSubject = /*#__PURE__*/React.createElement("span", {
      key: "resultsSummary-1"
    }, "for ", SEARCH_SUBJECTS[props.searchSubject]);
    var withSpan = /*#__PURE__*/React.createElement("span", {
      key: "resultsSummary-2"
    }, "with");
    var tagsToDisplay = ['q', 'topics', 'location', 'meetingDays', 'language', 'teamName', 'order', 'oer'];
    var resultsCount = /*#__PURE__*/React.createElement("span", {
      key: "resultsSummary-0"
    }, ngettext(msgid(_templateObject2(), props.searchResults.length, props.totalResults), "Showing ".concat(props.searchResults.length, " of ").concat(props.totalResults, " results"), props.totalResults));

    if (props.searchSubject === 'courses') {
      searchSummaryItems.push(resultsCount);
    }

    tagsToDisplay.map(function (tag) {
      var tagsArray = generateTagsPhrase(tag);

      if (!!tagsArray) {
        if (searchSummaryItems.length === 1) {
          // TODO searchSummaryItems.push(forSearchSubject)
          if (tag === 'q' || tag === 'topics') {// TODO searchSummaryItems.push(withSpan)
          }
        } else {// TODO searchSummaryItems.push(<span key={`resultsSummary-${searchSummaryItems.length}`}>and</span>)
          }

        searchSummaryItems.push(tagsArray);
      }
    });
    return searchSummaryItems;
  };

  var reloadWindow = function reloadWindow() {
    if (typeof window !== "undefined") {
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
    }
  };

  var noResults = props.searchResults.length === 0;
  var resetButton = /*#__PURE__*/React.createElement("button", {
    key: "reset-search",
    onClick: reloadWindow,
    className: "p2pu-btn light with-outline"
  }, t(_templateObject3()));
  return /*#__PURE__*/React.createElement("div", {
    className: "results-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-tags wrapper"
  }, generateSearchSummary()), noResults && /*#__PURE__*/React.createElement("div", {
    className: "clear-search"
  }, jt(_templateObject4(), resetButton)));
};

export default SearchTags;
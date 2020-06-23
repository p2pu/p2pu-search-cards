import React from 'react';
import { t, jt, ngettext, msgid } from 'ttag';
import { isoCodeToLangName } from '../utils/i18n';
import { MEETING_DAYS, SEARCH_SUBJECTS, COURSES_SORT_OPTIONS } from '../utils/constants';

const SearchTag = ({
  value,
  onDelete
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "search-tag"
  }, value, /*#__PURE__*/React.createElement("i", {
    className: "material-icons",
    onClick: () => onDelete(value),
    style: {
      cursor: 'pointer'
    }
  }, "clear"));
};

const SearchTags = props => {
  const generateQueryTag = () => {
    if (props.q) {
      const onDelete = value => {
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

  const generateTeamNameTag = () => {
    if (props.teamName) {
      const onDelete = value => {
        props.updateQueryParams({
          teamName: null,
          team_id: null
        });
        document.getElementById('team-title').style.display = 'none';
        document.getElementById('search-subtitle').style.display = 'block';
      };

      const humanReadableName = decodeURIComponent(props.teamName);
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

  const generateLanguageTag = () => {
    if (props.languages && props.languages.length > 0) {
      const onDelete = value => {
        const newLanguagesArray = props.languages.filter(v => v != value);
        const languages = newLanguagesArray.length > 0 ? newLanguagesArray : null;
        props.updateQueryParams({
          languages
        });
      };

      const introPhrase = props.languages.length === 1 ? 'in' : 'in';
      let languagesTagsArray = [/*#__PURE__*/React.createElement("span", {
        key: "languageTagIntro"
      }, introPhrase)];
      props.languages.map((item, index) => {
        if (props.languages.length > 1 && index === props.languages.length - 1) {
          languagesTagsArray.push( /*#__PURE__*/React.createElement("span", {
            key: `languageTag-${index + 2}`
          }, "or"));
        }

        let languageName = isoCodeToLangName(item);
        languagesTagsArray.push( /*#__PURE__*/React.createElement(SearchTag, {
          value: languageName,
          key: `languageTag-${index}`,
          onDelete: () => onDelete(item)
        }));
      });
      return languagesTagsArray;
    }
  };

  const generateOrderTag = () => {
    if (props.order) {
      const onDelete = value => {
        props.updateQueryParams({
          order: null
        });
      };

      const order = COURSES_SORT_OPTIONS.find(order => order.value == props.order);
      return [/*#__PURE__*/React.createElement("span", {
        key: "queryTagIntro"
      }, "sorted by "), /*#__PURE__*/React.createElement(SearchTag, {
        key: "queryTag-0",
        value: order.label,
        onDelete: onDelete
      })];
    }
  };

  const generateOerTag = () => {
    if (props.oer) {
      const onDelete = value => {
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

  const generateTopicsTags = () => {
    if (props.topics && props.topics.length > 0) {
      const onDelete = value => {
        const newTopicsArray = props.topics.filter(v => v != value);
        const topics = newTopicsArray.length > 0 ? newTopicsArray : null;
        props.updateQueryParams({
          topics
        });
      };

      const introPhrase = props.topics.length === 1 ? 'the topic' : 'the topics';
      let topicsTagsArray = [/*#__PURE__*/React.createElement("span", {
        key: "topicTagIntro"
      }, introPhrase)];
      topicsTagsArray = []; // TODO

      props.topics.map((item, index) => {
        if (props.topics.length > 1 && index === props.topics.length - 1) {
          topicsTagsArray.push( /*#__PURE__*/React.createElement("span", {
            key: `topicTag-${index + 2}`
          }, "or"));
        }

        topicsTagsArray.push( /*#__PURE__*/React.createElement(SearchTag, {
          value: item,
          key: `topicTag-${index}`,
          onDelete: onDelete
        }));
      });
      return topicsTagsArray;
    }
  };

  const generateLocationTag = () => {
    if (props.latitude && props.longitude) {
      const unit = props.useMiles ? 'miles' : 'km';
      let value = props.useMiles ? props.distance * 0.62 : props.distance;
      value = Math.round(value / 10) * 10;
      const text = t`Within ${value} ${unit}`;

      const onDelete = value => {
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
      const onDelete = value => {
        props.updateQueryParams({
          city: null
        });
      };

      return [/*#__PURE__*/React.createElement(SearchTag, {
        key: "locationTag-0",
        value: props.city,
        onDelete: onDelete
      })];
      return [/*#__PURE__*/React.createElement("span", {
        key: "locationTagIntro"
      }, "located in"), /*#__PURE__*/React.createElement(SearchTag, {
        key: "locationTag-0",
        value: props.city,
        onDelete: onDelete
      })];
    }
  };

  const generateMeetingDaysTags = () => {
    if (props.weekdays && props.weekdays.length > 0) {
      const onDelete = day => {
        const dayIndex = MEETING_DAYS.indexOf(day);
        const newWeekdayArray = props.weekdays.filter(val => val != dayIndex);
        const weekdays = newWeekdayArray.length > 0 ? newWeekdayArray : null;
        props.updateQueryParams({
          weekdays
        });
      };

      let weekdayTagsArray = [/*#__PURE__*/React.createElement("span", {
        key: "weekdayTagIntro"
      }, "meeting on")];
      weekdayTagsArray = []; // TODO

      props.weekdays.map((dayIndex, index) => {
        const weekdayName = MEETING_DAYS[dayIndex];

        if (props.weekdays.length > 1 && index === props.weekdays.length - 1) {
          weekdayTagsArray.push( /*#__PURE__*/React.createElement("span", {
            key: `weekdayTag-${index + 2}`
          }, "or"));
        }

        weekdayTagsArray.push( /*#__PURE__*/React.createElement(SearchTag, {
          value: weekdayName,
          key: `weekdatTag-${index}`,
          onDelete: onDelete
        }));
      });
      return weekdayTagsArray;
    }
  };

  const generateTagsPhrase = tag => {
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

  const generateSearchSummary = () => {
    const forSearchSubject = /*#__PURE__*/React.createElement("span", {
      key: "resultsSummary-1"
    }, "for ", SEARCH_SUBJECTS[props.searchSubject]);
    const withSpan = /*#__PURE__*/React.createElement("span", {
      key: "resultsSummary-2"
    }, "with");
    const tagsToDisplay = ['q', 'topics', 'location', 'meetingDays', 'language', 'teamName', 'order', 'oer'];
    let searchSummaryItems = [/*#__PURE__*/React.createElement("span", {
      key: "resultsSummary-0"
    }, ngettext(msgid`Showing ${props.searchResults.length} of ${props.totalResults} result`, `Showing ${props.searchResults.length} of ${props.totalResults} results`, props.totalResults))];
    tagsToDisplay.map(tag => {
      const tagsArray = generateTagsPhrase(tag);

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

  const reloadWindow = () => {
    if (typeof window !== `undefined`) {
      window.location.reload();
    }
  };

  const noResults = props.searchResults.length === 0;
  const resetButton = /*#__PURE__*/React.createElement("button", {
    key: "reset-search",
    onClick: reloadWindow,
    className: "p2pu-btn light with-outline"
  }, t`reset the search form`);
  return /*#__PURE__*/React.createElement("div", {
    className: "results-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-tags wrapper"
  }, generateSearchSummary()), noResults && /*#__PURE__*/React.createElement("div", {
    className: "clear-search"
  }, jt`To see more results, either remove some filters or ${resetButton}`));
};

export default SearchTags;
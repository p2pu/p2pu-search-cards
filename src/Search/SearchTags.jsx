import React from 'react';
import { t, jt, ngettext, msgid } from 'ttag';

import { MEETING_DAYS, SEARCH_SUBJECTS, COURSES_SORT_OPTIONS } from '../utils/constants';


const SearchTag = ({ value, onDelete }) => {
  return(
    <div className='search-tag'>
      {value}
      <i className="material-icons" onClick={ () => onDelete(value) } style={{ cursor: 'pointer' }}>clear</i>
    </div>
  )
}

const SearchTags = (props) => {
  const generateQueryTag = () => {
    if (props.q) {
      const onDelete = (value) => { props.updateQueryParams({ q: null }) }

      return [<span key='queryTagIntro'>the search query</span>, <SearchTag key='queryTag-0' value={props.q} onDelete={onDelete} />];
    }
  }

  const generateTeamNameTag = () => {
    if (props.teamName) {
      const onDelete = (value) => {
        props.updateQueryParams({ teamName: null, team_id: null })
        document.getElementById('team-title').style.display = 'none';
        document.getElementById('search-subtitle').style.display = 'block';
      }
      const humanReadableName = decodeURIComponent(props.teamName);

      return [<span key='queryTagIntro'>organized by</span>, <SearchTag key='queryTag-0' value={humanReadableName} onDelete={onDelete} />];
    }
  }

  const generateLanguageTag = () => {
    if (props.languages && props.languages.length > 0) {
      const onDelete = (value) => {
        const newLanguagesArray = props.languages.filter(v => v != value);
        const languages = newLanguagesArray.length > 0 ? newLanguagesArray : null
        props.updateQueryParams({ languages })
      }

      const introPhrase = props.languages.length === 1 ? 'in' : 'in';
      let languagesTagsArray = [<span key='languageTagIntro'>{introPhrase}</span>]

      props.languages.map((item, index) => {
        if (props.languages.length > 1 && index === (props.languages.length - 1)) {
          languagesTagsArray.push(<span key={`languageTag-${index + 2}`}>or</span>)
        }

        languagesTagsArray.push(<SearchTag value={item} key={`languageTag-${index}`} onDelete={onDelete} />)
      })

      return languagesTagsArray;
    }
  }

  const generateOrderTag = () => {
    if (props.order) {
      const onDelete = (value) => { props.updateQueryParams({ order: null }) };
      const order = COURSES_SORT_OPTIONS.find(order => order.value == props.order)

      return [<span key='queryTagIntro'>sorted by </span>, <SearchTag key='queryTag-0' value={order.label} onDelete={onDelete} />];
    }
  }

  const generateOerTag = () => {
    if (props.oer) {
      const onDelete = (value) => { props.updateQueryParams({ oer: false }) };

      return [<span key='queryTagIntro'>that are </span>, <SearchTag key='queryTag-0' value={"OER"} onDelete={onDelete} />];
    }
  }

  const generateTopicsTags = () => {
    if (props.topics && props.topics.length > 0) {
      const onDelete = (value) => {
        const newTopicsArray =  props.topics.filter(v => v != value);
        const topics = newTopicsArray.length > 0 ? newTopicsArray : null
        props.updateQueryParams({ topics })
      }

      const introPhrase = props.topics.length === 1 ? 'the topic' : 'the topics';
      let topicsTagsArray = [<span key='topicTagIntro'>{introPhrase}</span>]

      props.topics.map((item, index) => {
        if (props.topics.length > 1 && index === (props.topics.length - 1)) {
          topicsTagsArray.push(<span key={`topicTag-${index + 2}`}>or</span>)
        }

        topicsTagsArray.push(<SearchTag value={item} key={`topicTag-${index}`} onDelete={onDelete} />)
      })

      return topicsTagsArray;
    }
  }

  const generateLocationTag = () => {
    if (props.latitude && props.longitude) {
      const unit = props.useMiles ? 'miles' : 'km';
      const value = props.useMiles ? props.distance * 0.62 : props.distance;
      const roundedValue = Math.round(value / 10) * 10;
      const text = __(`Within ${roundedValue} ${unit} of your location`);
      const onDelete = (value) => {
        props.updateQueryParams({ latitude: null, longitude: null, distance: 50 })
      }
      return [<span key='locationTagIntro'>located</span>, <SearchTag key='locationTag-0' value={text} onDelete={onDelete} />];
    } else if (props.city) {
      const onDelete = (value) => {
        props.updateQueryParams({ city: null })
      }
      return [<span key='locationTagIntro'>located in</span>, <SearchTag key='locationTag-0' value={props.city} onDelete={onDelete} />];
    }
  }

  const generateMeetingDaysTags = () => {
    if (props.weekdays && props.weekdays.length > 0) {
      const onDelete = (day) => {
        const dayIndex = MEETING_DAYS.indexOf(day);
        const newWeekdayArray = props.weekdays.filter(val => val != dayIndex);
        const weekdays = newWeekdayArray.length > 0 ? newWeekdayArray : null;
        props.updateQueryParams({ weekdays })
      }

      let weekdayTagsArray = [<span key='weekdayTagIntro'>meeting on</span>]

      props.weekdays.map((dayIndex, index) => {
        const weekdayName = MEETING_DAYS[dayIndex];

        if (props.weekdays.length > 1 && index === props.weekdays.length - 1) {
          weekdayTagsArray.push(<span key={`weekdayTag-${index + 2}`}>or</span>)
        }

        weekdayTagsArray.push(<SearchTag value={weekdayName} key={`weekdatTag-${index}`} onDelete={onDelete} />)
      })

      return weekdayTagsArray;
    }
  }

  const generateTagsPhrase = (tag) => {
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
  }

  const generateSearchSummary = () => {
    const forSearchSubject = <span key='resultsSummary-1'>for {SEARCH_SUBJECTS[props.searchSubject]}</span>;
    const withSpan = <span key='resultsSummary-2'>with</span>;
    const tagsToDisplay = ['q', 'topics', 'location', 'meetingDays', 'language', 'teamName', 'order', 'oer'];

    let searchSummaryItems = [
      <span key='resultsSummary-0'>{
        ngettext(
          msgid`Showing ${props.searchResults.length} of ${props.totalResults} result`, 
          `Showing ${props.searchResults.length} of ${props.totalResults} results`, 
          props.totalResults.length
        )
      }</span>
    ];

    tagsToDisplay.map((tag) => {
      const tagsArray = generateTagsPhrase(tag);

      if (!!tagsArray) {
        if (searchSummaryItems.length === 1) {
          searchSummaryItems.push(forSearchSubject)
          if (tag === 'q' || tag === 'topics') {
            searchSummaryItems.push(withSpan)
          }
        } else {
          searchSummaryItems.push(<span key={`resultsSummary-${searchSummaryItems.length}`}>and</span>)
        }
        searchSummaryItems.push(tagsArray)
      }
    })

    return searchSummaryItems;
  }

  const reloadWindow = () => {
    if (typeof window !== `undefined`) {
      window.location.reload()
    }
  }

  const noResults = props.searchResults.length === 0;a
  const resetButton = <button onClick={reloadWindow} className='p2pu-btn light with-outline'>{t`reset the search form`}</button>;

  return(
    <div className='results-summary'>
      <div className='search-tags wrapper'>
        {generateSearchSummary()}
      </div>
      { noResults &&
        <div className='clear-search'>
          {jt`To see more results, either remove some filters or ${resetButton}`}
        </div>
      }
    </div>
  )
}

export default SearchTags;

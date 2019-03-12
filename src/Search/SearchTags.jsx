import React from 'react'

import { MEETING_DAYS, SEARCH_SUBJECTS, LANGUAGES, COURSES_SORT_OPTIONS } from '../utils/constants';


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
    if (props.language) {
      const onDelete = (value) => { props.updateQueryParams({ language: null }) };
      const lang = LANGUAGES.find(lang => lang.code == props.language)

      return [<span key='queryTagIntro'>in </span>, <SearchTag key='queryTag-0' value={lang.label} onDelete={onDelete} />];
    }
  }

  const generateOrderTag = () => {
    if (props.order) {
      const onDelete = (value) => { props.updateQueryParams({ order: null }) };
      const order = COURSES_SORT_OPTIONS.find(order => order.value == props.order)

      return [<span key='queryTagIntro'>sorted by </span>, <SearchTag key='queryTag-0' value={order.label} onDelete={onDelete} />];
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
      const text = `Within ${roundedValue} ${unit} of your location`;
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
    }
  }

  const generateSearchSummary = () => {
    const results = props.totalResults.length === 1 ? 'result' : 'results';
    const forSearchSubject = <span key='resultsSummary-1'>for {SEARCH_SUBJECTS[props.searchSubject]}</span>;
    const withSpan = <span key='resultsSummary-2'>with</span>;
    const tagsToDisplay = ['q', 'topics', 'location', 'meetingDays', 'language', 'teamName', 'order'];

    let searchSummaryItems = [<span key='resultsSummary-0'>Showing {props.searchResults.length} of {props.totalResults} {results}</span>];

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

  const noResults = props.searchResults.length === 0;

  return(
    <div className='results-summary'>
      <div className='search-tags wrapper'>
        {generateSearchSummary()}
      </div>
      { noResults &&
        <div className='clear-search'>
        To see more results, either remove some filters or <button onClick={() => {window.location.reload()}} className='p2pu-btn light with-outline'>reset the search form</button>
        </div>
      }
    </div>
  )
}

export default SearchTags;

import React, { Component } from 'react'
import { t } from 'ttag';
import queryString from 'query-string';

import SearchAndFilter from './SearchAndFilter'
import SearchTags from './SearchTags'
import { SEARCH_PROPS, API_ENDPOINTS } from '../utils/constants'
import ApiHelper from '../utils/apiHelper'

const SIGNUP_BY_TAB = ['open', 'closed']

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.initialState = this.setInitialState()
    this.state = this.initialState;
    this.handleChange = (s) => this._handleChange(s);
    this.handleInputChange = () => this._handleInputChange();
    this.handleSearchBarSubmit = (query) => this._handleSearchBarSubmit(query);
    this.searchCallback = (response, opts) => this._searchCallback(response, opts);
    this.updateQueryParams = (params) => this._updateQueryParams(params);
    this.sendQuery = (opts) => this._sendQuery(opts);
    this.loadInitialData = () => this._loadInitialData();
    this.apiHelper = new ApiHelper(this.props.searchSubject, this.props.origin);
  }

  setInitialState = () => {
    const defaults = {
      searchResults: [],
      totalResults: 0,
      distance: 50,
      useMiles: true,
      limit: 21,
      offset: 0,
      isLoading: false,
      hasMoreResults: false,
      appendResults: false,
      resultsTab: 0, // open for signup
    }

    let parsedParams = queryString.parse(window.location.search, { arrayFormat: 'comma' });
    const arrayItems = API_ENDPOINTS[this.props.searchSubject].arrayItems;

    arrayItems.forEach(term => {
      if (parsedParams[term] && typeof(parsedParams[term] === "string")) {
        parsedParams[term] = [parsedParams[term]]
      }
    })

    return {
      ...defaults,
      ...this.props.initialState,
      ...parsedParams
    }
  }

  componentDidMount() {
    const { scrollContainer } = this.props;
    const scrollContainerEl = scrollContainer ? document.querySelector(scrollContainer) : document.body

    const getScrollTop = scrollContainer ? () => { return scrollContainerEl.scrollTop } : () => { return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop }

    scrollContainerEl.onscroll = () => {
      const { isLoading, hasMoreResults } = this.state;
      if (isLoading || !hasMoreResults) {
        return;
      }

      const scrollTop = getScrollTop()
      const scrollHeight = (document.querySelector(".search-results") && document.querySelector(".search-results").scrollHeight) || document.body.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom) {
        this.updateQueryParams({ offset: this.state.searchResults.length, appendResults: true })
      }
    };

    this.loadInitialData();
  }

  _loadInitialData() {
    this.sendQuery({ initialQuery: true });
  }

  _sendQuery(opts={}) {
    this.setState({ isLoading: true }, () => {
      const params = this.state;
      console.log("search params", params)
      const options = { params, callback: this.searchCallback, ...opts };

      this.apiHelper.fetchResource(options);
    })
  }

  _updateQueryParams(params) {
    this.setState(params, () => {
      this.sendQuery()
      this.updateURL()
    })
  }

  updateURL = params => {
    const searchParams = API_ENDPOINTS[this.props.searchSubject].searchParams;
    const privateParams = API_ENDPOINTS[this.props.searchSubject].privateParams;
    const allowedParams = Object.keys(this.state)
      .filter(key => (searchParams.includes(key) && !privateParams.includes(key)))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: this.state[key]
        };
      }, {});

    const query = queryString.stringify(allowedParams, { skipNull: true, skipEmptyString: true, arrayFormat: 'comma' })
    window.history.replaceState(allowedParams, document.title, `${window.location.pathname}?${query}`)
  }

  _handleChange(selected) {
    const query = selected ? selected.label : selected;
    this.props.searchByLocation(query);
    this.setState({ value: selected });
  }

  _handleInputChange() {
    this.props.clearResults();
  }

  _searchCallback(response, opts) {
    const results = this.state.appendResults ? this.state.searchResults.concat(response.items) : response.items;
    const resultsTab = opts.initialQuery ? (response.signup_open_count && response.signup_open_count > 0) ? 0 : 1 : this.state.resultsTab;

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
      signupClosedCount: response.signup_closed_count,
      resultsTab: resultsTab,
    })
  }

  updateResultsTab = (tabIndex) => {
    this.setState({ resultsTab: tabIndex })
  }

  render() {
    const filterCollection = SEARCH_PROPS[this.props.searchSubject].filters;
    const sortCollection = SEARCH_PROPS[this.props.searchSubject].sort;
    const placeholder = SEARCH_PROPS[this.props.searchSubject].placeholder;
    const resultsSubtitle = SEARCH_PROPS[this.props.searchSubject].resultsSubtitle;
    const { Browse, NoResultsComponent } = this.props;
    const showNoResultsComponent = this.state.totalResults === 0 && this.state.initialQuery && !Boolean(window.location.search);

    return(
      <div className="page">
        <SearchAndFilter
          placeholder={placeholder}
          updateQueryParams={this.updateQueryParams}
          filterCollection={filterCollection}
          sortCollection={sortCollection}
          searchSubject={this.props.searchSubject}
          order={this.props.order}
          {...this.state}
        />
        {showNoResultsComponent ?
          <NoResultsComponent />:
          <SearchTags
            updateQueryParams={this.updateQueryParams}
            {...this.state}
            {...this.props}
          />
        }
        <Browse
          results={this.state.searchResults}
          updateQueryParams={this.updateQueryParams}
          onSelectResult={this.props.onSelectResult}
          courseLink={this.props.courseLink}
          moreInfo={this.props.moreInfo}
          locale={this.props.locale}
          columnBreakpoints={this.props.columnBreakpoints}
          signupClosedCount={this.state.signupClosedCount}
          signupOpenCount={this.state.signupOpenCount}
          updateResultsTab={this.updateResultsTab}
        />
        {
          this.state.isLoading &&
          <div className="loader" />
        }
      </div>
    )
  }
}


Search.defaultProps = {
  NoResultsComponent: () => <p className="my-4">{t`There are no active learning circles right now.`}</p>
}

import React, { Component } from 'react'
import queryString from 'query-string'
import ReactLoading from 'react-loading';

import SearchAndFilter from './SearchAndFilter'
import SearchTags from './SearchTags'
import { SEARCH_PROPS } from '../utils/constants'
import ApiHelper from '../utils/apiHelper'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      totalResults: 0,
      distance: 50,
      useMiles: true,
      limit: 21,
      offset: 0,
      isLoading: false,
      hasMoreResults: false,
      appendResults: false,
    }
    this.handleChange = (s) => this._handleChange(s);
    this.handleInputChange = () => this._handleInputChange();
    this.handleSearchBarSubmit = (query) => this._handleSearchBarSubmit(query);
    this.searchCallback = (response, opts) => this._searchCallback(response, opts);
    this.updateQueryParams = (params) => this._updateQueryParams(params);
    this.sendQuery = (opts) => this._sendQuery(opts);
    this.loadInitialData = () => this._loadInitialData();
  }

  componentDidMount() {
    const urlParams = queryString.parse(window.location.search);
    if (urlParams.team_id) {
      this.setState({ team_id: urlParams.team_id })
    }

    window.onscroll = () => {
      const { isLoading, hasMoreResults } = this.state;
      if (isLoading || !hasMoreResults) {
        return;
      }

      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
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
    this.updateQueryParams({ active: true, signup: 'open', team_id: this.state.team_id, limit: this.state.limit, offset: this.state.offset });
  }

  _sendQuery(opts={}) {
    this.setState({ isLoading: true }, () => {
      const params = this.state;
      const options = { params, callback: this.searchCallback, ...opts };
      const api = new ApiHelper(this.props.searchSubject, this.props.origin);

      api.fetchResource(options);
    })
  }

  _updateQueryParams(params) {
    this.setState(params, this.sendQuery);
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

    this.setState({
      searchResults: results,
      currentQuery: opts.params,
      totalResults: response.count,
      offset: 0,
      isLoading: false,
      appendResults: false,
      hasMoreResults: response.count > 0 && results.length < response.count,
    })
  }

  render() {
    const filterCollection = SEARCH_PROPS[this.props.searchSubject].filters;
    const sortCollection = SEARCH_PROPS[this.props.searchSubject].sort;
    const placeholder = SEARCH_PROPS[this.props.searchSubject].placeholder;
    const resultsSubtitle = SEARCH_PROPS[this.props.searchSubject].resultsSubtitle;
    const { Browse } = this.props;

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
        <SearchTags
          updateQueryParams={this.updateQueryParams}
          {...this.state}
          {...this.props}
        />
        <Browse
          results={this.state.searchResults}
          updateQueryParams={this.updateQueryParams}
          onSelectResult={this.props.onSelectResult}
        />
        {
          this.state.isLoading &&
          <div className="loader-container">
            <ReactLoading height={30} width={60} color={"#515665"} type="bubbles" />
          </div>
        }
      </div>
    )
  }
}

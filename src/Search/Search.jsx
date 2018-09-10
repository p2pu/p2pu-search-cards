import React, { Component } from 'react'
import SearchAndFilter from './SearchAndFilter'
import SearchTags from './SearchTags'
import { SEARCH_PROPS } from '../utils/constants'
import ApiHelper from '../utils/apiHelper'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      distance: 50,
      useMiles: true,
    }
    this.handleChange = (s) => this._handleChange(s);
    this.handleInputChange = () => this._handleInputChange();
    this.handleSearchBarSubmit = (query) => this._handleSearchBarSubmit(query);
    this.searchCallback = (response, opts) => this._searchCallback(response, opts);
    this.updateQueryParams = (params) => this._updateQueryParams(params);
    this.sendQuery = () => this._sendQuery();
    this.loadInitialData = () => this._loadInitialData();
  }

  componentDidMount() {
    this.loadInitialData();
  }

  _loadInitialData() {
    this.updateQueryParams({ active: true, signup: 'open', order: 'title', team_id: this.state.team_id });
  }

  _sendQuery() {
    const params = this.state;
    const opts = { params, callback: this.searchCallback };
    const api = new ApiHelper(this.props.searchSubject, this.props.origin);

    api.fetchResource(opts);
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
    const results = opts.appendResults ? this.state.searchResults.concat(response.items) : response.items;

    this.setState({
      searchResults: results,
      currentQuery: opts.params,
      totalResults: response.count
    })
  }

  render() {
    const filterCollection = SEARCH_PROPS[this.props.searchSubject].filters;
    const placeholder = SEARCH_PROPS[this.props.searchSubject].placeholder;
    const resultsSubtitle = SEARCH_PROPS[this.props.searchSubject].resultsSubtitle;
    const { Browse } = this.props;

    return(
      <div className="page">
        <SearchAndFilter
          placeholder={placeholder}
          updateQueryParams={this.updateQueryParams}
          filterCollection={filterCollection}
          searchSubject={this.props.searchSubject}
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
      </div>
    )
  }
}

import React, { Component } from 'react'
import ReactLoading from 'react-loading';
import { t } from 'ttag';

import SearchAndFilter from './SearchAndFilter'
import SearchTags from './SearchTags'
import { SEARCH_PROPS } from '../utils/constants'
import ApiHelper from '../utils/apiHelper'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      searchResults: [],
      totalResults: 0,
      distance: 50,
      useMiles: true,
      limit: 21,
      offset: 0,
      isLoading: false,
      hasMoreResults: false,
      appendResults: false,
      active: true,
      signup: 'open',
      ...props.initialState
    }
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

  componentDidMount() {
    const { scrollContainer } = this.props;
    const scrollContainerEl = scrollContainer ? document.querySelector(scrollContainer) : document.body

    scrollContainerEl.onscroll = () => {
      const { isLoading, hasMoreResults } = this.state;
      if (isLoading || !hasMoreResults) {
        return;
      }

      const scrollTop = scrollContainerEl.scrollTop;
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
      const options = { params, callback: this.searchCallback, ...opts };

      this.apiHelper.fetchResource(options);
    })
  }

  _updateQueryParams(params) {
    this.setState(params, this.sendQuery());
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
      initialQuery: opts.initialQuery
    })
  }

  render() {
    const filterCollection = SEARCH_PROPS[this.props.searchSubject].filters;
    const sortCollection = SEARCH_PROPS[this.props.searchSubject].sort;
    const placeholder = SEARCH_PROPS[this.props.searchSubject].placeholder;
    const resultsSubtitle = SEARCH_PROPS[this.props.searchSubject].resultsSubtitle;
    const { Browse, NoResultsComponent } = this.props;
    const showNoResultsComponent = this.state.totalResults === 0 && this.state.initialQuery;

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


Search.defaultProps = {
  NoResultsComponent: () => <p className="my-4">{t`There are no active learning circles right now.`}</p>
}

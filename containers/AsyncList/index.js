import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState } from 'zc-core/api/selectors'

import { selectResults, selectPageProperties, selectErrorMessage } from './selectors'

import { AsyncList as AsyncListComponent } from './AsyncList'

const mapStateToProps = (state, props) => ({
  data: selectResults(state, props),
  errorMessage: selectErrorMessage(state, props),
  api: selectAPIState(state, props),
  pageProperties: selectPageProperties(state, props),
})

const mapDispatchToProps = (
  dispatch,
  { endpoint, pageSize, currentPage, params = {} },
) => ({
  fetchResults: () => dispatch(apiRequest(
    endpoint,
    { page: currentPage, page_size: pageSize, ...params },
  )),
})

/*
  This filters out some props that don't need to be passed down to AsyncList / ZCGriddle
  or are otherwise already being passed down wrapped in pageProperties
*/

const mergeProps = (
  state,
  dispatch,
  { currentPage, pageSize, storeKey, endpoint, ...props },
) => ({
  ...state,
  ...dispatch,
  ...props,
})

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(toJS(AsyncListComponent))

/**
  AsyncList interfaces with zconnect v2 django paginated results endpoints using zc-core.
  This is a controlled component so will just fetch and display the currentPage at the pageSize
  specified in props.

  You need to handle the page state manually via redux or url search params or use
  AsyncListWithState which makes the component stateful and provides an events object used by
  the griddle with functions that update that state

  The storeMethod exported from utils must be used when defining the endpoint so
  that the data is stored in the expected way
*/
export default function AsyncList({ ...props }) {
  return <Connected {...props} />
}

AsyncList.propTypes = {
  /** The endpoint key to use for fetch as defined in the endpoints passed to zc-core */
  endpoint: PropTypes.string.isRequired,
  /** The storeKey defined in the endpoint config */
  storeKey: PropTypes.string.isRequired,
  /** The number of results to fetch and display per page */
  pageSize: PropTypes.number,
  /** The page number to fetch */
  currentPage: PropTypes.number,
}

AsyncList.defaultProps = {
  currentPage: 1,
  pageSize: 10,
}

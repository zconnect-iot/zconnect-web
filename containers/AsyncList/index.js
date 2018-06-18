import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState } from 'zc-core/api/selectors'

import { selectResults, selectPageProperties, selectErrorMessage } from './selectors'

import { AsyncList as Unconnected } from './AsyncList'

const mapStateToProps = (state, props) => ({
  data: selectResults(state, props),
  errorMessage: selectErrorMessage(state, props),
  api: selectAPIState(state, props),
  pageProperties: selectPageProperties(state, props),
})

const mapDispatchToProps = (dispatch, { endpoint, pageSize = 10, currentPage = 1, params = {} }) => ({
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(toJS(Unconnected))

/**
 * AsyncList interfaces with zconnect v2 django paginated results endpoints. This is
 * a controlled component so will just fetch and display the currentPage at the pageSize
 * specified in props.
 *
 * You need to maintain the state manually via redux or url search params or use
 * AsyncListWithState makes the component stateful and provides an events object used by
 * the griddle with functions that update that state
 *
 * Passing hidePagination and hideFilter props it's possible to make this a controlled
 * component and handle pagination, sorting and filtering outside of Griddle
*/
// export default function AsyncList({ ...props }) {
//   return <Connected {...props} />
// }

// AsyncList.propTypes = {
//   /** The name of the endpoint config which should use the storeMethod in utils */
//   endpoint: PropTypes.string.isRequired,
//   * the storeKey defined inside the endpoint config 
//   storeKey: PropTypes.string.isRequired,
//   /** How many items to show per page */
//   pageSize: PropTypes.number,
//   /** Which page to show */
//   currentPage: PropTypes.number,
// }

// AsyncList.defaultProps = {
//   pageSize: 10,
//   currentPage: 1,
// }

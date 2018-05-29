/*
  AsyncList interfaces with zconnect v2 django paginated results endpoints. This is
  a controlled component so will just fetch and display the currentPage at the pageSize
  specified in props.

  You need to maintain the state manually via redux or url search params or use
  AsyncListWithState makes the component stateful and provides an events object used by
  the griddle with functions that update that state

  Required props:
    endpoint - the name of the endpoint config which should use the storeMethod in utils
    storeKey - the storeKey defined inside the endpoint config
    pageSize - number - defaults to 10
    currentPage - number - defaults to 1

  Passing hidePagination and hideFilter props it's possible to make this a controlled
  component and handle pagination, sorting and filtering outside of Griddle
*/

import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState } from 'zc-core/api/selectors'

import { selectResults, selectPageProperties, selectErrorMessage } from './selectors'

import AsyncList from './AsyncList'

const mapStateToProps = (state, props) => ({
  data: selectResults(state, props),
  errorMessage: selectErrorMessage(state, props),
  api: selectAPIState(state, props),
  pageProperties: selectPageProperties(state, props),
})

const mapDispatchToProps = (dispatch, {
  endpoint, pageSize = 10, currentPage = 1, params = {},
}) => ({
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
  {
    currentPage, pageSize, storeKey, endpoint, ...props
  },
) => ({
  ...state,
  ...dispatch,
  ...props,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(toJS(AsyncList))

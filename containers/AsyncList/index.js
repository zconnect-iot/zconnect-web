/*
  AsyncList interfaces with zconnect v2 django paginated results endpoints

  Required props:
    endpoint - the name of the endpoint config which should use the storeMethod in utils
    storeKey - the storeKey defined inside the endpoint config

  Optional:
    pageSize - number - defaults to 10
    currentPage - number - defaults to 1
    filter - string - defaults to ''
    sort - object - Must have id matching a ColumnDefinition and ascending boolean

  All other props and children are passed down to ZCGriddle and into the underlying
  Griddle which means it exports the same api as a standard Griddle

  Using the optional props above and passing the hidePagination and hideFilter props
  it's possible to make this a controlled component and handle pagination, sorting
  and filtering outside of Griddle
*/

import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState } from 'zc-core/api/selectors'

import { selectResults, selectPageProperties } from './selectors'

import AsyncList from './AsyncList'

const getInitialState = ({
  currentPage = 1,
  pageSize = 10,
  filter = '',
  sort = { id: 'id', ascending: true },
}) => ({
  currentPage,
  filter,
  sort,
  pageSize,
})

const stateHandlers = {
  onNext: ({ currentPage }) => () => ({
    currentPage: currentPage + 1,
  }),
  onPrevious: ({ currentPage }) => () => ({
    currentPage: currentPage - 1,
  }),
  onGetPage: () => currentPage => ({
    currentPage,
  }),
  onFilter: () => filter => ({
    filter,
  }),
  onSort: ({ sort }) => id => ({
    sort: { id, ascending: sort.id === id ? !sort.ascending : true },
  }),
}

const mapStateToProps = (state, props) => ({
  data: selectResults(state, props),
  api: selectAPIState(state, props),
  pageProperties: selectPageProperties(state, props),
})

const mapDispatchToProps = (dispatch, { endpoint, pageSize = 10, currentPage }) => ({
  fetchResults: () => dispatch(apiRequest(endpoint, { page: currentPage, page_size: pageSize })),
})

// This filters out some props that don't need to be passed down to AsyncList / ZCGriddle
// or are otherwise already being passed down wrapped in pageProperties
const mergeProps = (
  state,
  dispatch,
  { currentPage, pageSize, filter, sort, storeKey, endpoint, onNext, onPrevious,
    onFilter, onSort, onGetPage, ...props },
) => ({
  ...state,
  ...dispatch,
  ...props,
  events: {
    onNext,
    onPrevious,
    onGetPage,
    onSort,
    onFilter,
  },
})

export default compose(
  withStateHandlers(
    getInitialState,
    stateHandlers,
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
)(toJS(AsyncList))

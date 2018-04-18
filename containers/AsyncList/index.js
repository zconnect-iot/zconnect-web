/*
  AsyncList interfaces with zconnect v2 django paginated results endpoints
*/

import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState } from 'zc-core/api/selectors'

import { selectResults, selectRecordCount } from './selectors'

import AsyncList from './AsyncList'

const getInitialState = ({ currentPage = 1, filter = '', sort = { id: 'id', ascending: true } }) => ({
  currentPage,
  filter,
  sort,
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

const mapStateToProps = (state, { storeKey, pageSize = 10 }) => ({
  data: selectResults(state, { storeKey, pageSize }),
  recordCount: selectRecordCount(state, { storeKey, pageSize }),
  api: selectAPIState(state, { storeKey }),
})

const mapDispatchToProps = (dispatch, { endpoint, pageSize = 10, currentPage }) => ({
  fetchResults: () => dispatch(apiRequest(endpoint, { page: currentPage, page_size: pageSize })),
})

export default compose(
  withStateHandlers(
    getInitialState,
    stateHandlers,
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(toJS(AsyncList))

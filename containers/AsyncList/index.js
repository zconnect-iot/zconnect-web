/*
  AsyncList interfaces with zconnect v2 django paginated results endpoints
*/

import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'

import { selectResults, selectRecordCount } from './selectors'

import AsyncList from './AsyncList'

const mapStateToProps = (state, { storeKey, pageSize = 10 }) => ({
  data: selectResults(state, { storeKey, pageSize }),
  recordCount: selectRecordCount(state, { storeKey, pageSize }),
})

const mapDispatchToProps = (dispatch, { endpoint }) => ({
  fetchResults: page => dispatch(apiRequest(endpoint, { page })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(AsyncList))

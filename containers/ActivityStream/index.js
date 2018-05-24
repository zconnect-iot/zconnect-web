/*
  Required props:
    deviceId - the device id to fetch activities for
  Optional props:
    start - start period for range UTC ISO string (default = 1 week ago)
    end - end period for range (default = now)
*/

import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState, selectErrorMessage } from 'zc-core/api/selectors'

import { selectResults, selectMoreAvailable, storeKey } from './selectors'

import ActivityStream from './components/ActivityStream'


const mapStateToProps = (state, props) => ({
  activities: selectResults(state, props),
  errorMessage: selectErrorMessage(state, { storeKey }),
  api: selectAPIState(state, { storeKey }),
  moreAvailable: selectMoreAvailable(state, props),
})

const mapDispatchToProps = (dispatch, { deviceId, start, end, page, onNext }) => ({
  fetchActivities: () => {
    dispatch(apiRequest(
      'getActivities',
      { deviceId, start, end, page, page_size: 10 },
    ))
    onNext() // Increment page counter
  },
})

export default compose(
  withStateHandlers(
    { page: 1 },
    {
      onNext: ({ page }) => () => ({
        page: page + 1,
      }),
      resetPage: () => () => ({ page: 1 }),
    },
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
)(ActivityStream)

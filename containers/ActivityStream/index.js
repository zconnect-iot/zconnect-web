/*
  Required props:
    deviceId - the device id to fetch activities for
  Optional props:
    start - start period for range UTC ISO string (default = 1 week ago)
    end - end period for range (default = now)
*/

import { connect } from 'react-redux'
import { compose, mapProps } from 'recompose'
import XDate from 'xdate'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState, selectErrorMessage } from 'zc-core/api/selectors'

import { selectResults, selectMoreAvailable, selectNextPage, storeKey } from './selectors'

import ActivityStream from './components/ActivityStream'


const mapStateToProps = (state, props) => ({
  activities: selectResults(state, props),
  errorMessage: selectErrorMessage(state, { storeKey }),
  api: selectAPIState(state, { storeKey }),
  moreAvailable: selectMoreAvailable(state, props),
  nextPage: selectNextPage(state, props),
})

const mapDispatchToProps = (dispatch, { deviceId, start, end }) => ({
  fetchActivities: page => dispatch(apiRequest(
    'getActivities',
    { deviceId, start, end, page, page_size: 10 },
  )),
})

const mergeProps = (state, dispatch, props) => ({
  ...state,
  ...props,
  fetchActivities: () => dispatch.fetchActivities(state.nextPage),
})

export default compose(
  // Convert ISO date strings to ms since epoch
  mapProps(({ start, end, ...props }) => ({
    ...props,
    start: start && XDate(start, true).getTime(),
    end: end && XDate(end, true).getTime(),
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  toJS,
)(ActivityStream)

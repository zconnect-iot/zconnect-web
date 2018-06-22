import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, mapProps } from 'recompose'
import XDate from 'xdate'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectAPIState, selectErrorMessage } from 'zc-core/api/selectors'

import { selectResults, selectMoreAvailable, selectNextPage, storeKey } from './selectors'

import { ActivityStream as UnconnectedAS } from './components/ActivityStream'


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

const Composed = compose(
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
)(UnconnectedAS)

/**
 Display a 'news feed' style log of all activity on a given device.

 Handles fetching data for the id, start and end props provided showing 10
 results at a time and appending the next 10 results when the More button is clicked
 until no more results are available on server
 */
export default function ActivityStream({ ...props }) {
  return <Composed {...props} />
}

ActivityStream.propTypes = {
  /** The device id to fetch activities for */
  deviceId: PropTypes.string.isRequired,
  /** Start date in ISO string format */
  start: PropTypes.string,
  /** End date in ISO string format */
  end: PropTypes.string,
}

ActivityStream.defaultProps = {
  start: null,
  end: null,
}

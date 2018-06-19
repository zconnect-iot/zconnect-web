import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { apiRequest } from 'zc-core/api/actions'

import { TimeSeriesGraph as Unconnected } from './TimeSeriesGraph'

import {
  selectGraphData,
  selectTimeConfigFromProps,
  selectTSAPIState,
} from './selectors'

const mapStateToProps = (state, props) => ({
  ...props,
  api: selectTSAPIState(state).toJS(),
  data: selectGraphData(state, props),
  timeConfig: selectTimeConfigFromProps(state, props),
})

const mapDispatchToProps = dispatch => ({
  fetchGraphData: (deviceId, resolution, start, end) => dispatch(apiRequest(
    'getTimeSeriesData',
    { deviceId, resolution, start, end },
  )),
})

const mergeProps = (state, dispatch) => ({
  ...state,
  fetchGraphData: () => dispatch.fetchGraphData(
    state.deviceId,
    state.timeConfig.resolution,
    state.timeConfig.start,
    state.timeConfig.end,
  ),
})

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Unconnected)

export default function TimeSeriesGraph({ ...props }) {
  return <Connected {...props} />
}

TimeSeriesGraph.propTypes = {
  deviceId: PropTypes.string.isRequired,
  mode: PropTypes.shape().isRequired,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  graphTheme: PropTypes.shape(),
  graphProps: PropTypes.shape(),
}

TimeSeriesGraph.defaultProps = {
  graphTheme: {},
  graphProps: {},
  startTime: null,
  endTime: null,
}

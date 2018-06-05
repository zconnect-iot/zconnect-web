import { connect } from 'react-redux'

import { apiRequest } from 'zc-core/api/actions'

import TimeSeriesGraph from './TimeSeriesGraph'

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TimeSeriesGraph)

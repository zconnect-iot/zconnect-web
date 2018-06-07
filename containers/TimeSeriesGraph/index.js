import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, setPropTypes } from 'recompose'

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

const propTypes = {
  fetchGraphData: PropTypes.func.isRequired,
  mode: PropTypes.shape().isRequired,
  graphTheme: PropTypes.shape(),
  data: PropTypes.shape({
    sensors: PropTypes.array,
    data: PropTypes.array,
  }).isRequired,
  api: PropTypes.shape({
    pending: PropTypes.bool,
    error: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
}

const ConnectedTimeSeriesGraph = compose(
  setPropTypes(propTypes),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
)(TimeSeriesGraph)

ConnectedTimeSeriesGraph.propTypes = propTypes
ConnectedTimeSeriesGraph.defaultProps = {
  graphTheme: {},
}

export default ConnectedTimeSeriesGraph

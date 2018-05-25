import React from 'react'

import { connect } from 'react-redux'
import { ResponsiveBar } from '@nivo/bar'

import { apiRequest } from 'zc-core/api/actions'

import {
  selectGraphData,
  selectResolutionForMode,
  selectGraphStartParam,
  selectGraphEndParam,
  selectDeviceIdFromProps,
} from './selectors'

class TimeSeriesGraph extends React.PureComponent {
  componentWillMount() {
    this.props.fetchGraphData()
  }

  componentWillReceiveProps(props) {
    // Check if anything has changed, if so re-fetch the data
    // if (props.mode !== this.props.mode) {
    //   props.fetchGraphData()
    // }
  }

  render() {
    console.log("timeseriesgraph props", this.props)
    return (
      <ResponsiveBar
        data={this.props.data}
        indexBy="label"
        // keys={this.props.mode.keys}
        keys={this.props.mode.keys}
        margin={{
          "top": 20,
          "right": 20,
          "bottom": 40,
          "left": 20
        }}
        axisBottom={{
          "orient": "bottom",
          "tickSize": 5,
          "tickPadding": 15,
          "tickRotation": 0,
          "legend": "time",
          "legendPosition": "center",
          "legendOffset": 36
        }}
        groupMode="grouped"
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  data: selectGraphData(state, props),
  resolution: selectResolutionForMode(state, props),
  deviceId: selectDeviceIdFromProps(state, props),
  start: selectGraphStartParam(state, props),
  end: selectGraphEndParam(state, props),
})

const mapDispatchToProps = dispatch => ({
  fetchGraphData: (deviceId, resolution, start, end) => dispatch(apiRequest(
    'getTimeSeriesData',
    {
      deviceId,
      resolution,
      start,
      end,
    },
    undefined,
    60 //AppSettings.pollingInterval,
  )),
})

const mergeProps = (state, dispatch) => ({
  ...state,
  fetchGraphData: () => dispatch.fetchGraphData(
    state.deviceId,
    state.resolution,
    state.start,
    state.end,
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TimeSeriesGraph)
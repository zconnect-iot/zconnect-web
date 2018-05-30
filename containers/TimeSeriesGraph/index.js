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
    const multipleKeys = this.props.mode.keys && this.props.mode.keys.length > 1
    const keys = this.props.mode.keys.map(
      key => this.props.data.sensors.find(
        sensor => sensor.startsWith(key.replace(/_/g, ' '))
      )
    )
    console.log(this.props.data.sensors)
    console.log("keys", keys)

    return (
      <ResponsiveBar
        data={this.props.data.data}
        indexBy="label"
        keys={keys}
        margin={{
          "top": 25,
          "right": multipleKeys ? 200 : 40,
          "bottom": 40,
          "left": 40
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
        animate={false}
        enableLabel={false}
        legends={multipleKeys
          ? [{
            "dataFrom": "keys",
            "anchor": "bottom-right",
            "direction": "column",
            "translateX": 120,
            "itemWidth": 100,
            "itemHeight": 30,
            "itemsSpacing": 2,
            "symbolSize": 25
          }]
          : []
        }
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  data: selectGraphData(state, props),
  resolution: selectResolutionForMode(state, props),
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
import React from 'react'

import { connect } from 'react-redux'
import { ResponsiveBar } from '@nivo/bar'

import { apiRequest } from 'zc-core/api/actions'

import {
  selectGraphData,
  selectDeviceIdFromProps,
  selectTimeConfigFromProps,
} from './selectors'

class TimeSeriesGraph extends React.PureComponent {
  componentWillMount() {
    this.props.fetchGraphData()
  }

  componentWillReceiveProps(props) {
    // Check if anything has changed, if so re-fetch the data
    console.log(props.timeConfig)
    console.log(this.props.timeConfig)
    console.log(props.timeConfig !== this.props.timeConfig)
    if (JSON.stringify(props.timeConfig) !== JSON.stringify(this.props.timeConfig)) {
      props.fetchGraphData()
    }
  }

  render() {
    const multipleKeys = this.props.mode.keys && this.props.mode.keys.length > 1
    const keys = this.props.mode.keys.map(
      key => this.props.data.sensors.find(
        sensor => sensor.startsWith(key.replace(/_/g, ' '))
      )
    )

    return (
      <ResponsiveBar
        data={this.props.data.data}
        indexBy="label"
        keys={keys}
        margin={{
          "top": 25,
          "right": multipleKeys ? 200 : 40,
          "bottom": 90,
          "left": 40
        }}
        axisBottom={{
          "orient": "bottom",
          "tickSize": 5,
          "tickPadding": 15,
          "tickRotation": 45,
          "legend": "time",
          "legendPosition": "center",
          "legendOffset": 80
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

const mapStateToProps = (state, props) => {
  return {
    ...props,
    data: selectGraphData(state, props),
    timeConfig: selectTimeConfigFromProps(state, props),
  }
}

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
    state.timeConfig.resolution,
    state.timeConfig.start,
    state.timeConfig.end, // TODO: rename back to start/end
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TimeSeriesGraph)
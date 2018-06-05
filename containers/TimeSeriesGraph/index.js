import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { ResponsiveBar } from 'nivo-bar'

import { apiRequest } from 'zc-core/api/actions'

import colors from '../../theme/colors'

import {
  selectGraphData,
  selectTimeConfigFromProps,
  selectTSAPIState,
} from './selectors'

class TimeSeriesGraph extends React.PureComponent {
  componentDidMount() {
    this.props.fetchGraphData()
  }

  componentWillReceiveProps(props) {
    // Check if anything has changed, if so re-fetch the data
    if (JSON.stringify(props.timeConfig) !== JSON.stringify(this.props.timeConfig))
      props.fetchGraphData()
  }

  render() {
    const multipleKeys = this.props.mode.keys && this.props.mode.keys.length > 1
    const keys = this.props.mode.keys.map(
      key => this.props.data.sensors.find(
        sensor => sensor.startsWith(key.replace(/_/g, ' ')),
      ),
    )

    if (this.props.data.data.length === 0 && !this.props.api.pending)
      return <p>No data available in the chosen time range</p>

    const grey = '#464646'

    const legendConfig = [{
      anchor: 'bottom-right',
      dataFrom: 'keys',
      direction: 'row',
      itemHeight: 30,
      itemsSpacing: 2,
      itemWidth: 150,
      symbolSize: 25,
      textColor: grey,
      translateY: 105,
    }]

    function tooltip(input) { // Shouldn't pass arrow functions in component props
      const rounded = Math.round(parseFloat(input.value) * 100) / 100
      return <span>{input.id}: {rounded}</span>
    }

    return (
      <ResponsiveBar
        data={this.props.data.data}
        indexBy="label"
        keys={keys}
        margin={{
          top: 20,
          bottom: multipleKeys ? 105 : 80,
          left: 40,
          right: 20,
        }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 15,
          tickRotation: 45,
          legendPosition: 'center',
          legendOffset: 70,
        }}
        groupMode="grouped"
        animate={false}
        enableLabel={false}
        tooltip={tooltip}
        legends={multipleKeys ? legendConfig : []}
        colors={[
          colors.brandPrimary,
          colors.brandSuccess,
          colors.brandSecondary,
        ]}
        theme={{
            tooltip: {
                container: {
                    fontSize: '13px',
                },
            },
            axis: {
                textColor: grey,
                legendColor: grey,
                tickColor: grey,
            },
        }}
      />
    )
  }
}

TimeSeriesGraph.propTypes = {
  fetchGraphData: PropTypes.func.isRequired,
  timeConfig: PropTypes.shape().isRequired,
  mode: PropTypes.shape().isRequired,
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

const mapStateToProps = (state, props) => ({
  ...props,
  api: selectTSAPIState(state).toJS(),
  data: selectGraphData(state, props),
  timeConfig: selectTimeConfigFromProps(state, props),
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
    60, // AppSettings.pollingInterval,
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

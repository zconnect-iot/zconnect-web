import React from 'react'
import PropTypes from 'prop-types'

import { ResponsiveBar } from 'nivo-bar'

import vars from '!!sass-vars-to-js-loader!./style.scss'

import { Spinner } from '../../components'

class TimeSeriesGraph extends React.PureComponent {
  componentDidMount() {
    this.props.fetchGraphData()
  }

  componentWillReceiveProps(props) {
    // Check if anything has changed, if so re-fetch the data
    const changed = p => JSON.stringify(props[p]) !== JSON.stringify(this.props[p])

    if (changed('timeConfig') || (changed('data') && props.data.data.length === 0))
      props.fetchGraphData()
  }

  render() {
    const multipleKeys = this.props.mode.keys && this.props.mode.keys.length > 1
    const keys = this.props.mode.keys.map(
      key => this.props.data.sensors.find(
        sensor => sensor.startsWith(key.replace(/_/g, ' ')),
      ),
    )
    const legendConfig = [{
      anchor: 'bottom-right',
      dataFrom: 'keys',
      direction: 'row',
      itemHeight: 30,
      itemsSpacing: 2,
      itemWidth: 150,
      symbolSize: 25,
      textColor: vars.timeSeriesGraphTextColor.rgba,
      translateY: 105,
    }]

    function tooltip(input) { // Shouldn't pass arrow functions in component props
      const rounded = Math.round(parseFloat(input.value) * 100) / 100
      return <span>{input.id}: {rounded}</span>
    }

    if (this.props.api.pending)
      return <Spinner />

    if (this.props.data.data.length === 0 && !this.props.api.pending)
      return <p>No data available in the chosen time range</p>

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
          vars.timeSeriesGraphColor1.rgba,
          vars.timeSeriesGraphColor2.rgba,
          vars.timeSeriesGraphColor3.rgba,
        ]}
        theme={{
          ...this.props.graphTheme,
          tooltip: {
            container: {
              fontSize: '13px',
            },
          },
          axis: {
            textColor: vars.timeSeriesGraphTextColor.rgba,
            legendColor: vars.timeSeriesGraphTextColor.rgba,
            tickColor: vars.timeSeriesGraphTextColor.rgba,
          },
        }}
        {...this.props.graphProps}
      />
    )
  }
}

TimeSeriesGraph.propTypes = {
  fetchGraphData: PropTypes.func.isRequired,
  mode: PropTypes.shape().isRequired,
  graphTheme: PropTypes.shape(),
  graphProps: PropTypes.shape(),
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

TimeSeriesGraph.defaultProps = {
  graphTheme: {},
  graphProps: {},
}

export { TimeSeriesGraph }

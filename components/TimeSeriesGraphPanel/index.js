import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Panel } from 'zc-web/views'
import { TimeSeriesGraph } from 'zc-web/containers'

import './style.scss'

const classes = BEMHelper({ name: 'TimeSeriesGraphPanel' })

export default class TimeSeriesGraphPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: props.modes[0].title,
    }
  }

  render() {
    let activeMode

    const modes = this.props.modes.map((mode) => {
      const active = this.state.mode === mode.title
      if (active) activeMode = mode
      return {
        ...mode,
        active,
        action: () => this.setState(prev => ({ ...prev, mode: mode.title })),
      }
    })

    return (
      <Panel
        {...classes()}
        title={this.props.title || 'Time Series Data'}
        actions={modes}
      >
        <TimeSeriesGraph
          {...classes('graph')}
          mode={activeMode}
          deviceId={this.props.deviceId}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
        />
      </Panel>
    )
  }
}

TimeSeriesGraphPanel.propTypes = {
  title: PropTypes.string,
  deviceId: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  modes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
}

TimeSeriesGraphPanel.defaultProps = {
  title: 'Time Series Data',
  startTime: null,
  endTime: null,
}

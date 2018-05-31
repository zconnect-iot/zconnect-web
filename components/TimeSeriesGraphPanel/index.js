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

    const actions = props.modes.map(mode => {
      mode.action = () => {
        this.setState(
          (prevState) => Object.assign(prevState, {mode: mode.title})
        )
      }
      return mode
    })

    this.state = {
      actions: actions,
      mode: props.modes[0].title
    }
  }

  render() {
    let activeMode
    const modes = this.state.actions.map(mode => {
      mode.active = this.state.mode === mode.title
      if (mode.active) activeMode = mode
      return mode
    })
    return (
      <Panel {...classes()}
        title={this.props.title || "Time Series Data"}
        actions={modes}
      >
        <TimeSeriesGraph {...classes('graph')}
          mode={activeMode}
          deviceId={this.props.deviceId}
          startTime={this.props.startTime}
          endTime={this.props.endTime}
        />
      </Panel>
    )
  }
}
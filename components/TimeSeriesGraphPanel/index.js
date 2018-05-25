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
    console.log("timeseriesgraphpanel props:", this.props)
    console.log(this.state)
    let activeMode
    const modes = this.props.modes.map(mode => {
      mode.active = this.state.mode === mode.title
      if (mode.active) activeMode = mode
      return mode
    })
    console.log(modes)
    console.log("activeMode", activeMode)
    return (
      <Panel {...classes()}
        title={this.props.title || "Time Series Data"}
        actions={this.state.actions}
      >
        <TimeSeriesGraph {...classes('graph')}
          mode={activeMode}
        />
        {activeMode.title}
        {this.state.mode}

      </Panel>
    )
  }
}
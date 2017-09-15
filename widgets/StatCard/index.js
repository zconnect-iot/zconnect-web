import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import BEMHelper from 'react-bem-helper'

import './style.scss'

/**
 * Stat card component for displaying large, simple metrics.
 */
export const classes = new BEMHelper('StatCard')

const StatCard = props => {
  let delta = null
  if (props.delta) {
    const down = props.delta < 0
    delta = <span {...classes('delta', {
      down,
      danger: down === !props.reverseColor,
    })}>
      {props.delta}{props.deltaUnits}
    </span>
    console.log('StatCard', props, {down, danger: down || props.reverseColor})
  }
  return <div {...classes()}>
    <div>
      <span {...classes('description')}>{props.description}</span>
      <div>
        <div {...classes('figure')}>
          {props.figure}
          {delta}
        </div>
      </div>
    </div>
  </div>
}

StatCard.propTypes = {
  figure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  delta: PropTypes.number,
  reverseColor: PropTypes.bool,
  deltaUnits: PropTypes.string,
}

export default StatCard

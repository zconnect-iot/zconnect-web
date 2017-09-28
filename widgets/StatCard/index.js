import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

/**
 * Stat card component for displaying large, simple metrics.
 */
export const classes = new BEMHelper('StatCard')

const StatCard = (props) => {
  let delta = null
  if (props.delta) {
    const down = props.delta < 0
    delta = (<span {...classes('delta', { down, danger: down === !props.reverseColor })}>
      {props.delta}{props.deltaUnits}
    </span>)
  }
  const contents = [
    <div {...classes('figure')}>{props.figure}{delta}</div>,
    <span {...classes('description')}>{props.description}</span>
  ]
  if (props.invert) {
    contents.reverse()
  }
  return (<div {...classes()}>{contents}</div>)
}

StatCard.propTypes = {
  figure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  delta: PropTypes.number,
  reverseColor: PropTypes.bool,
  deltaUnits: PropTypes.string,
  invert: PropTypes.bool,
}

StatCard.defaultProps = {
  delta: 0,
  reverseColor: false,
  deltaUnits: '',
  invert: false,
}
export default StatCard

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

  const commonModifiers = {
    inline: props.inline,
  }
  const contents = [
    <span key={1} {...classes('description', commonModifiers)}>
      {props.description}
    </span>,

    <div
      key={0}
      {...classes('figure', {
        inline: props.inline,
        danger: props.dangerFigure,
      })}
    >
      {props.figure}{delta}
    </div>,
  ]
  if (props.invert)
    contents.reverse()

  return <div {...classes(null, commonModifiers, props.className)}>{contents}</div>
}

StatCard.propTypes = {
  figure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  delta: PropTypes.number,
  reverseColor: PropTypes.bool,
  deltaUnits: PropTypes.string,
  invert: PropTypes.bool,
  inline: PropTypes.bool,
  dangerFigure: PropTypes.bool,
  className: PropTypes.string,
}

StatCard.defaultProps = {
  delta: 0,
  reverseColor: false,
  deltaUnits: '',
  invert: false,
  inline: false,
  dangerFigure: false,
  className: null,
}
export default StatCard

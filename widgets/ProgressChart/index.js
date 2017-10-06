import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('ProgressChart')

const brandColors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'grey',
]

/**
 * A progress bar for use in a {@link ProgressChart}.
 *
 * @param {number} props.value the value to display.
 * @param {number} [props.maximum=100] a maximum value to compare against.
 * @param {string} [props.color] the foreground colour.
 * @param {string} [props.background] the background colour.
 * @param {string} [props.textColor] the text colour.
 * @param {string} [props.text] optional text to render over the bar.
 */
export const ProgressBar = (props) => {
  const foregroundStyle = {
    color: props.textColor,
    width: `${Math.floor((100 * props.value) / props.maximum)}%`,
  }
  let colorClass = ''
  if (brandColors.includes(props.color))
    colorClass = props.color
  else
    foregroundStyle.backgroundColor = props.color

  const text = props.text || `${props.value}${props.units}`
  return (
    <div
      {...classes('bar-background')}
      style={{ backgroundColor: props.background }}
    >
      <div {...classes('bar-foreground', colorClass)} style={foregroundStyle}>
        {text}
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  maximum: PropTypes.number,
  color: PropTypes.string,
  background: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
  units: PropTypes.string,
}

ProgressBar.defaultProps = {
  maximum: 0,
  color: '',
  background: '',
  textColor: '',
  text: '',
  units: '%',
}

/**
* Progress bar chart.
*/
const ProgressChart = props => <div {...classes()}>{props.children}</div>
ProgressChart.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default ProgressChart

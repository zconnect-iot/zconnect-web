import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('ProgressChart')

/**
 * A progress bar for use in a {@link ProgressChart}.
 *
 * All colours can be specified as either a hex string or a theme colour string
 * (e.g. `'primary').
 *
 * @param {number} props.value the value to display.
 * @param {number} [props.maximum=100] a maximum value to compare against.
 * @param {string} [props.foregroundColor] the foreground colour.
 * @param {string} [props.backgroundColor] the background colour.
 * @param {string} [props.textColor] the text colour.
 * @param {string} [props.text] optional text to render over the bar.
 */
export const ProgressBar = ({
  value,
  maximum,
  foregroundColor,
  backgroundColor,
  textColor,
  text,
  units,
}) => {
  // Foreground styles.
  const foregroundStyle = {
    width: `${Math.floor((100 * value) / maximum)}%`,
  }
  const foregroundClasses = []
  if (foregroundColor.startsWith('#'))
    foregroundStyle.backgroundColor = foregroundColor
  else if (foregroundColor)
    foregroundClasses.push(`bg-${foregroundColor}`)
  if (textColor.startsWith('#'))
    foregroundStyle.color = textColor
  else if (textColor)
    foregroundClasses.push(`text-${textColor}`)

  // Background styles.
  const backgroundStyle = {}
  let backgroundClass = ''
  if (backgroundColor.startsWith('#'))
    backgroundStyle.backgroundColor = backgroundColor
  else if (backgroundColor)
    backgroundClass = `bg-${backgroundColor}`

  const content = text || `${value}${units}`
  return (
    <div
      {...classes('bar-background', null, backgroundClass)}
      style={backgroundStyle}
    >
      <div
        {...classes('bar-foreground', null, foregroundClasses)}
        style={foregroundStyle}
      >
        {content}
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  maximum: PropTypes.number,
  foregroundColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string,
  units: PropTypes.string,
}

ProgressBar.defaultProps = {
  maximum: 0,
  foregroundColor: 'success',
  backgroundColor: '',
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

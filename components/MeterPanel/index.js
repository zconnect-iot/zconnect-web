import React from 'react'
import PropTypes from 'prop-types'
import { defaultProps } from 'recompose'
import classnames from 'classnames'

import PieChart from '../PieChart'

import vars from '!!sass-vars-to-js-loader!./style.scss'
import './style.scss'


const OpenPieChart = defaultProps({
  startAngle: -135,
  endAngle: 135,
  innerRadius: 60,
  sort: null,
})(PieChart)

/**
  This is really just a PieChart with start and end angles set.

  To simplify usage, you can just pass an array of numbers (and optionally colours)
  which are mapped to the expected data shape for the underlying PieChart
*/

export default function MeterPanel({ data, title, label, className, colors, ...props }) {
  let mappedData
  if (typeof data[0] === 'number') mappedData = data.map((value, i) => ({
    value,
    color: colors[i],
  }))
  return (
    <div className={classnames('MeterPanel', className)}>
      {title && <h3>{title}</h3>}
      <OpenPieChart data={mappedData || data} {...props} />
      {label && <h4>{label}</h4>}
    </div>
  )
}

MeterPanel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number,
    }),
  ])).isRequired,
  title: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
}

MeterPanel.defaultProps = {
  title: '',
  label: '',
  className: '',
  colors: [
    vars.meterPanelColor1.rgba,
    vars.meterPanelColor2.rgba,
  ],
}

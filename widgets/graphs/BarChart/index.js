import React from 'react'
import PropTypes from 'prop-types'
import Barchart from 'react-bar-chart'

import { withDimensions } from '../../../hocs'

function BarChart(props) {
  const { className, data, margin, yLabel, height, width } = props
  return (<div className={className}>
    <Barchart
      data={data.map(item => ({ ...item, text: item.label }))}
      margin={margin}
      yLabel={yLabel}
      height={height}
      width={width}
    />
  </div>)
}

BarChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
  yLabel: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

BarChart.defaultProps = {
  className: '',
  data: [],
  margin: {
    top: 0,
    right: 0,
    bottom: 20,
    left: 24,
  },
  yLabel: '',
}

export default withDimensions(BarChart)

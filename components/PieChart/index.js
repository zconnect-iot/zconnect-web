import React from 'react'
import PropTypes from 'prop-types'
import { arc as d3Arc, pie as d3Pie, scaleOrdinal, select, schemeCategory10 } from 'd3'
import { withFauxDOM } from 'react-faux-dom'

import './style.scss'

/**
  d3 PieChart component. Can be customised by including a `color` in the `data` array.
  Otherwise will just use default d3 category10 scheme

  Sorts by highest value clockwise from 12'o'clock but this can be over-ridden
*/

class PieChart extends React.PureComponent {
  componentWillMount() {
    const faux = this.props.connectFauxDOM('div', 'chart')
    this.svg = select(faux)
      .append('svg')
    this.renderD3(this.props)
  }
  componentWillReceiveProps(props) {
    if (props.data !== this.props.data ||
      props.width !== this.props.width ||
      props.height !== this.props.height ||
      props.innerRadius !== this.props.innerRadius) this.renderD3(props)
  }
  renderD3 = (props) => {
    const { data, width, height, innerRadius, startAngle, endAngle, sort } = props
    const radius = Math.min(width, height) / 2
    const pi = Math.PI
    const color = scaleOrdinal(schemeCategory10)
    const vis = this.svg
      .data([data])
      .attr('width', width)
      .attr('height', height)
      .append('svg:g')
      .attr('transform', `translate(${radius}, ${radius})`)

    const arc = d3Arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)

    const pie = d3Pie()
      .value(d => d.value)
      .sort(sort)
      .startAngle(startAngle * (pi / 180))
      .endAngle(endAngle * (pi / 180))

    const arcs = vis.selectAll('g.slice')
      .data(pie)
      .enter()
      .append('svg:g')
      .attr('class', d => `slice ${d.className || ''}`)

    arcs.append('svg:path')
      .attr('fill', (d, i) => d.data.color || color(i))
      .attr('d', arc)

    arcs.append('svg:text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d, i) => {
        const text = data[i].label || Math.round(data[i].value)
        if (text === '0') return null
        return text
      })

    // Get height of main g and adjust svg height to fit
    props.drawFauxDOM(2000)
  }
  render() {
    return (
      <div className="PieChart">
        {this.props.chart}
      </div>
    )
  }
}

PieChart.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  innerRadius: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  connectFauxDOM: PropTypes.func.isRequired,
  chart: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  sort: PropTypes.func,
}

PieChart.defaultProps = {
  chart: 'loading',
  height: 200,
  width: 200,
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  sort: (a, b) => b.value - a.value,
}

export default withFauxDOM(PieChart)

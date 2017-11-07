import React from 'react'
import PropTypes from 'prop-types'
import Barchart from 'react-bar-chart'

export default class BarChart extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
    }
  }
  componentDidMount() {
    window.onresize = this.updateWidth
    setTimeout(this.updateWidth, 0)
  }
  componentWillUnmount() {
    window.onresize = null
  }
  setRef = (ref) => {
    this.ref = ref
  }
  updateWidth = () => this.setState({ width: this.ref.offsetWidth })
  render() {
    const { className, data, margin, yLabel, height, width } = this.props
    return (<div ref={this.setRef} className={className}>
      <Barchart
        data={data.map(item => ({ ...item, text: item.label }))}
        margin={margin}
        yLabel={yLabel}
        height={height}
        width={width || this.state.width}
      />
    </div>)
  }
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
  height: PropTypes.number,
  width: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.null,
  ]),
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
  height: 300,
  width: null,
}

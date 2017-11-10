import React from 'react'

/*
  withDimensions provides the wrapped component with responsive height and width
  props. Provides optional config object to over ride the default deounce interval
*/
export default function withDimensions(WrappedComponent, { debounceInterval = 250 } = {}) {
  return class WithDimensions extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        width: 0,
        height: 0,
      }
    }
    componentDidMount() {
      window.onresize = this.debouncedUpdateDims
      setTimeout(this.updateDims, 0)
    }
    componentWillUnmount() {
      window.onresize = null
    }
    setRef = (ref) => {
      this.ref = ref
    }
    updateDims = () => this.setState({
      width: this.ref.offsetWidth,
      height: this.ref.offsetHeight,
    })
    debouncedUpdateDims = () => {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(this.updateDims, debounceInterval)
    }
    render() {
      return (<div ref={this.setRef}>
        <WrappedComponent {...this.state} {...this.props} />
      </div>)
    }
  }
}

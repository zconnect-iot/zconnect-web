import React from 'react'

export default function withDimensions(WrappedComponent) {
  return class WithDimensions extends React.PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        width: 0,
        height: 0,
      }
    }
    componentDidMount() {
      window.onresize = this.updateDims
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
    render() {
      return (<div ref={this.setRef}>
        <WrappedComponent {...this.state} {...this.props} />
      </div>)
    }
  }
}

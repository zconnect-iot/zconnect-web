import React from 'react'

import ErrorHandler from './ErrorHandler'
/*
  Wraps the component in an error boundary and renders the FallbackComponent in
  the event of a render error. The retry callback resets the state which triggers
  another render attempt. The errorCallback can be used for reporting errors to Sentry
*/

export default function withErrorBoundary(config = {}) {
  const { FallbackComponent = ErrorHandler, errorCallback = null } = config
  return function withErrorBoundaryEnhancer(WrappedComponent) {
    class WithErrorBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          error: null,
        }
      }
      componentDidCatch(error, info) {
        this.setState({ error, info })
        return errorCallback ? errorCallback(error, info) : null
      }
      retry = () => this.setState({ error: null })
      render() {
        if (this.state.error) return (<FallbackComponent
          retry={this.retry}
          error={this.state.error}
          info={this.state.info}
        />)
        return <WrappedComponent {...this.props} />
      }
    }
    WithErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return WithErrorBoundary
  }
}

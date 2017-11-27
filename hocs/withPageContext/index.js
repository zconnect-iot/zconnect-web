import React from 'react'
import PropTypes from 'prop-types'


export default function withPageContext() {
  return function withPageContextEnhancer(WrappedComponent) {
    class WithPageContext extends React.Component {
      constructor(props, context) {
        super(props)
        this.state = {
          location: context.page.location,
        }
      }
      componentDidMount() {
        this.sub = this.context.page.subscribe(location => this.setState({ location }))
      }
      componentWillUnmount() {
        this.context.page.unsubscribe(this.sub)
      }
      render() {
        return (<WrappedComponent
          {...this.props}
          location={this.state.location}
          navigate={this.context.page.navigate}
        />)
      }
    }
    WithPageContext.contextTypes = {
      page: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
        location: PropTypes.string.isRequired,
      }).isRequired,
    }
    withPageContext.displayName = `withPageContext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return WithPageContext
  }
}

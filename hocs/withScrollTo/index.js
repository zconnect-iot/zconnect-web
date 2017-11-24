import React from 'react'
import PropTypes from 'prop-types'
import scrollToElement from 'scroll-to-element'

/*
  scrollTo provides an api to trigger auto scrolling to a wrapped component.
  The WrappedComponent takes a single `scrollTo` boolean prop (defaulting to false)
  that determines whether or not the component should be scrolled to on mount.
  It also passes a `scrollTo` function prop to the wrapped component so that it can
  trigger the scroll-to effect manually
*/

export default function withScrollTo({ offset = 0, align = 'top', duration = 1000, delay = 0 } = {}) {
  return function withScrollToEnhancer(WrappedComponent) {
    class WithScrollTo extends React.PureComponent {
      componentDidMount() {
        if (this.props.scrollTo) this.scrollToComponent()
      }
      setRef = (ref) => {
        this.ref = ref
      }
      scrollToElement = () => scrollToElement(this.ref, { offset, align, duration })
      scrollToComponent = () => {
        if (delay) setTimeout(this.scrollToElement, delay)
        else this.scrollToElement()
      }
      render() {
        return (<div ref={this.setRef}>
          <WrappedComponent {...this.props} scrollTo={this.scrollToComponent} />
        </div>)
      }
    }
    WithScrollTo.propTypes = {
      scrollTo: PropTypes.bool,
    }
    WithScrollTo.defaultProps = {
      scrollTo: false,
    }
    withScrollTo.displayName = `withScrollTo(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return WithScrollTo
  }
}

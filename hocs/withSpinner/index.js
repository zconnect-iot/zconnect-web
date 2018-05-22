import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Spinner } from '../../components'
/*
  withSpinner replaces wrapped components children with spinner if pending = true
*/

export default function withSpinner() {
  return function withSpinnerEnhancer(WrappedComponent) {
    function WithSpinner({ pending, children, spinnerSize, className, ...props }) {
      return (<WrappedComponent {...props} className={classnames(className, pending && 'spinning')}>
        {pending ? <Spinner size={spinnerSize} /> : children }
      </WrappedComponent>)
    }
    WithSpinner.propTypes = {
      pending: PropTypes.bool,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]),
      className: PropTypes.string,
      spinnerSize: PropTypes.number,
    }
    WithSpinner.defaultProps = {
      pending: false,
      children: null,
      className: '',
      spinnerSize: 30,
    }
    withSpinner.displayName = `withSpinner(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return WithSpinner
  }
}

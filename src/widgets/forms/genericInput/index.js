import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.scss'

/** Generic error-rendering function. */
const genericError = message => <span className={styles.error}>
  {message}
</span>

/** Generic warning-rendering function. */
const genericWarning = message => <span className={styles.warning}>
  {message}
</span>

/**
 * Function providing generic structure for an input component.
 *
 * For use inside a redux-form `Field` element.
 * @example
 * import BEMHelper from 'react-bem-helper'
 * const classes = new BEMHelper
 * const renderInner = props => genericInput(classes, props)
 * <Field type='text' component={renderInner} {...props} />
 *
 * @param {BEMHelper} classes a {@link react-bem-helper} object.
 * @param {Object} props props for this input component.
 * @param {?function} [renderError] an error-rendering function.
 * @param {?function} [renderWarning] a warning-rendering function.
 */
const genericInput = (
  classes,
  props,
  renderError = genericError,
  renderWarning = genericWarning
) => {
  const {touched, error, warning} = props.meta
  return <div {...classes(null, null, styles.control)}>
    <label
      htmlFor={props.name}
      {...classes('label', null, styles.label)}
    >
      {props.label}
    </label>

    <input
      type={props.type}
      placeholder={props.placeholder || props.label}
      {...classes('input', null, styles.input)}
      {...props.input}
    />

    {touched && (
      (error && renderError(error)) ||
      (warning && renderWarning(warning))
    )}
  </div>
}

/** Prop types which should be acceptable for most inputs. */
const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.arrayOf(PropTypes.func),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
}

export {
  genericWarning,
  genericError,
  genericInput as default,
  propTypes,
}

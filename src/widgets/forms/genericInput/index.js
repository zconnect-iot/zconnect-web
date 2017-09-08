import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { Field } from 'redux-form/immutable'

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

/**
 * Create a new field component.
 *
 * @param {string} blockname the name of the BEM block (e.g. 'email-field').
 * @param {string} type the type of the input (e.g. 'email').
 * @param {function} [renderError] a function for rendering errors.
 * @param {function} [renderWarning] a function for rendering warnings.
 * @returns {Object} the component and its input rendering function.
 */
const createFieldComponent = (
  blockname,
  type,
  renderError = genericError,
  renderWarning = genericWarning
) => {
  const classes = new BEMHelper(blockname)
  const renderInput = props => genericInput(
    classes, props, renderError, renderWarning)
  const component = props =>
    <Field type={type} component={renderInput} {...props} />
  return {
    classes,
    renderInput,
    component,
  }
}

export {
  genericWarning,
  genericError,
  genericInput as default,
  propTypes,
  createFieldComponent,
}

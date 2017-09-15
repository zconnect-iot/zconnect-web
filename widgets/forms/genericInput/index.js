import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { Field } from 'redux-form/immutable'
import uniqueId from 'lodash/uniqueId'

import './style.scss'

/** Generic error-rendering function. */
export const genericError = (classes, message) => <span {...classes('error')}>
  {message}
</span>

/** Generic warning-rendering function. */
export const genericWarning = (classes, message) => <span {...classes('warning')}>
  {message}
</span>

/**
 * Function providing generic structure for an input component.
 *
 * For use inside a redux-form `Field` element.
 * @example
 * import BEMHelper from 'react-bem-helper'
 * const classes = new BEMHelper('WidgetBlockName')
 * const renderInner = props => genericInner(classes, props)
 * <Field type='text' component={renderInner} {...props} />
 *
 * @param {BEMHelper} classes a {@link react-bem-helper} object.
 * @param {Object} props props for this input component.
 * @param {?function} [renderError] an error-rendering function.
 * @param {?function} [renderWarning] a warning-rendering function.
 */
const genericInner = (
  classes,
  props,
  renderError = genericError,
  renderWarning = genericWarning,
) => {
  const { touched, error, warning } = props.meta
  const inputId = uniqueId('FormField__input')
  return (<div {...classes()}>
    <label
      htmlFor={inputId}
      {...classes('label', {
        checked: props.input.checked,
        disabled: props.input.disabled,
      })}
    >
      {props.label}
    </label>

    <input
      id={inputId}
      type={props.type}
      placeholder={props.placeholder || props.label}
      {...classes('input')}
      {...props.input}
    />

    {touched && (
      (error && renderError(classes, error)) ||
      (warning && renderWarning(classes, warning))
    )}
  </div>)
}

/** Prop types which should be acceptable for most inputs. */
export const propTypes = {
  meta: PropTypes.object.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.func),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
}

genericInner.propTypes = propTypes

/**
 * Create a new field component.
 *
 * @param {string} blockname the name of the BEM block (e.g. 'email-field').
 * @param {string} type the type of the input (e.g. 'email').
 * @param {function} [renderError] a function for rendering errors.
 * @param {function} [renderWarning] a function for rendering warnings.
 * @returns {Object} the component and its input rendering function.
 */
export const createFieldComponent = (
  blockname,
  type,
  renderError = genericError,
  renderWarning = genericWarning,
) => {
  const classes = new BEMHelper(blockname)
  const renderInput = props => genericInner(
    classes, props, renderError, renderWarning)
  const component = props =>
    <Field type={type} component={renderInput} {...props} />
  return {
    classes,
    renderInput,
    component,
  }
}

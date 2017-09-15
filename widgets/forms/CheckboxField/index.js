import React from 'react'
import { Field } from 'redux-form/immutable'
import { fieldPropTypes } from 'redux-form/es/propTypes'
import BEMHelper from 'react-bem-helper'
import uniqueId from 'lodash/uniqueId'

import { genericError, genericWarning } from '../genericInput/index'

import './style.scss'

export const classes = new BEMHelper('CheckboxField')

/**
 * Specialised checkbox component.
 *
 * Renders a hidden `<input type="checkbox" />` along with a more easily-styled
 * `div` inside a container with a click handler.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Advanced_styling_for_HTML_forms#Check_boxes_and_radio_buttons}
 */
export const renderInput = (props) => {
  const { touched, error, warning } = props.meta
  const inputId = uniqueId('CheckboxField__input')
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
      type="checkbox"
      placeholder={props.placeholder || props.label}
      {...classes('input')}
      {...props.input}
    />

    {touched && (
      (error && genericError(error)) ||
      (warning && genericWarning(warning))
    )}
  </div>)
}

renderInput.propTypes = fieldPropTypes

const component = props => (<Field
  type={'checkbox'}
  component={renderInput}
  {...props}
/>)

component.propTypes = fieldPropTypes

export default component

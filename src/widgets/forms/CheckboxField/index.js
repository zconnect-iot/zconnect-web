import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field } from 'redux-form/immutable'
import BEMHelper from 'react-bem-helper'
import uniqueId from 'lodash/uniqueId'

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
export const renderInput = props => {
  const { touched, error, warning } = props.meta
  const inputId = uniqueId('CheckboxField__input')
  return <div {...classes()}>
    <input
      id={inputId}
      type='checkbox'
      checked={props.input.checked}
      {...classes('input')}
      {...props.input}
    />

    <label
      htmlFor={inputId}
      {...classes('label', props.checked ? 'checked' : 'unchecked')}
    >
      {props.label}
    </label>

    {touched && (
      (error && renderError(error)) ||
      (warning && renderWarning(warning))
    )}
  </div>
}

export default props => <Field
  type={'checkbox'}
  component={renderInput}
  {...props}
/>

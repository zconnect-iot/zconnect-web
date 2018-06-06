import React from 'react'
import { Field } from 'redux-form/immutable'
import BEMHelper from 'react-bem-helper'

import {
  genericError,
  genericWarning,
  innerPropTypes,
  propTypes,
} from '../genericInput/index'

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
class Checkbox extends React.Component {
  onChange = () => console.log('hello', this.props.input) || this.props.input.onChange(!!this.props.input.checked)
  render() {
    const { input, meta, placeholder, label } = this.props
    const { touched, error, warning } = meta
    const inputId = `${meta.form}_${input.name}`
    console.log('Cheeky', input, input.checked);
    return (<div
      {...classes(null, { checked: input.checked, disabled: input.disabled })}
    >
      <label htmlFor={inputId}><span>{label}</span></label>
      <input
        id={inputId}
        type="checkbox"
        placeholder={placeholder || label}
        {...classes('input')}
        {...input}
      />
      {touched && (
        (error && genericError(error)) ||
        (warning && genericWarning(warning))
      )}
    </div>)
  }
}

Checkbox.propTypes = innerPropTypes

const CheckboxField = props => (<Field
  type="checkbox"
  component={Checkbox}
  {...props}
/>)

CheckboxField.propTypes = propTypes

export default CheckboxField

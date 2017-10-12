import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import BEMHelper from 'react-bem-helper'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

import {
  genericError,
  genericWarning,
  propTypes,
  defaultProps,
} from '../genericInput/index'

import './style.scss'

export const classes = new BEMHelper('DateField')

export const renderInner = ({
  input,
  placeholder,
  label,
  meta: { touched, error, warning },
  dateFormat,
}) => (
  <div {...classes()}>
    <label htmlFor={input.name} {...classes('label')}>{label}</label>

    <div {...classes('input-wrapper')}>
      <DatePicker
        {...input}
        {...classes('input')}
        dateFormat={dateFormat}
        selected={input.value ? moment(input.value) : null}
        placeholder={placeholder}
      />

      {touched && (
        (error && genericError(classes, error)) ||
        (warning && genericWarning(classes, warning))
      )}
    </div>
  </div>
)
renderInner.propTypes = {
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.arrayOf(PropTypes.func),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
}

renderInner.defaultProps = Object.assign({
  dateFormat: 'DD/MM/YYYY',
  placeholder: 'Date',
}, defaultProps)

const component = props => <Field component={renderInner} {...props} />
component.propTypes = propTypes
component.defaultProp = defaultProps

export default component

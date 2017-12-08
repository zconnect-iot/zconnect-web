import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import BEMHelper from 'react-bem-helper'
import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import XDate from 'xdate'

import { instanceOfXDate } from 'zc-core/utils/propTypes'

import {
  genericError,
  genericWarning,
  propTypes,
  defaultProps,
} from '../genericInput/index'

import './style.scss'

export const classes = new BEMHelper('DateField')

export class DatePicker extends React.Component {
  onChange = value => this.props.input.onChange(XDate(value.toISOString()))
  noop = () => {}
  render() {
    const {
      input,
      placeholderText,
      label,
      meta: { touched, error, warning },
      dateFormat,
    } = this.props
    return (
      <div {...classes()}>
        <label htmlFor={input.name} {...classes('label')}>{label}</label>

        <div {...classes('input-wrapper')}>
          <ReactDatePicker
            {...input}
            {...classes('input')}
            onChange={this.onChange}
            onBlur={this.noop}
            dateFormat={dateFormat}
            selected={input.value ? moment(input.value.toISOString()) : null}
            placeholderText={placeholderText}
          />

          {touched && (
            (error && genericError(classes, error)) ||
            (warning && genericWarning(classes, warning))
          )}
        </div>
      </div>
    )
  }
}

DatePicker.propTypes = {
  dateFormat: PropTypes.string,
  placeholderText: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    warning: PropTypes.string,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: instanceOfXDate.isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.arrayOf(PropTypes.func),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
}

DatePicker.defaultProps = Object.assign({
  dateFormat: 'DD/MM/YYYY',
  placeholderText: 'Date',
}, defaultProps)

const component = props => <Field component={DatePicker} {...props} />
component.propTypes = propTypes
component.defaultProp = defaultProps

export default component

import React from 'react'
import { Field } from 'redux-form/immutable'
import BEMHelper from 'react-bem-helper'
import uniqueId from 'lodash/uniqueId'

import {
  genericError,
  genericWarning,
  innerPropTypes,
  propTypes,
  defaultProps,
} from '../genericInput/index'

import './style.scss'

const classes = BEMHelper('SelectField')

export const renderInner = (props) => {
  const { touched, error, warning } = props.meta
  const selectId = uniqueId('SelectField__input')
  return (<div {...classes()}>
    {props.label && <label
      htmlFor={selectId}
      {...classes('label', {
        checked: props.input.checked,
        disabled: props.disabled,
      })}
    >
      {props.label}
    </label>}

    <select
      id={selectId}
      placeholder={props.placeholder || props.label}
      {...classes('select')}
      {...props.input}
    >
      {props.children}
    </select>

    {touched && (
      (error && genericError(classes, error)) ||
      (warning && genericWarning(classes, warning))
    )}
  </div>)
}

renderInner.propTypes = innerPropTypes

const component = props => (<Field
  type="checkbox"
  component={renderInner}
  {...props}
/>)

export default component

component.propTypes = propTypes
component.defaultProps = defaultProps

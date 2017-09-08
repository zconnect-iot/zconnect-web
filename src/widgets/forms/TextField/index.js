import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import BEMHelper from 'react-bem-helper'

import genericInput from '../genericInput/index'

const classes = new BEMHelper('textfield')

const renderInner = props => genericInput(classes, props)

const TextField = props => <Field
  type='text'
  component={renderInner}
  {...props}
/>


TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.arrayOf(PropTypes.func),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
}

export {
  renderInner,
  TextField as default,
}

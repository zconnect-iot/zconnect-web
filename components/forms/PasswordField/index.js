import React from 'react'
import PropTypes from 'prop-types'
import { createFieldComponent } from '../genericInput/index'

import './style.scss'

const { component, renderInput, classes } = createFieldComponent('PasswordField', 'password')

function PasswordField({ ...props }) {
  // You can't just render <component ... />, it doesn't gert parsed correctly
  const Field = component
  return <Field {...props} />
}

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.arrayOf(PropTypes.func),
  autocomplete: PropTypes.bool,
}

PasswordField.defaultProps = {
  validate: [],
  autocomplete: false,
}

export {
  PasswordField as default,
  renderInput,
  classes,
}

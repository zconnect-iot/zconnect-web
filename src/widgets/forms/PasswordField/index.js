import { createFieldComponent } from '../genericInput/index'

const { component, renderInput, classes } = createFieldComponent('password-field', 'password')

export {
  component as default,
  renderInput,
  classes,
}

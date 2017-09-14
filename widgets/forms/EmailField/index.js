import { createFieldComponent } from '../genericInput/index'

const { component, renderInput, classes } = createFieldComponent('EmailField', 'email')

export {
  component as default,
  renderInput,
  classes,
}

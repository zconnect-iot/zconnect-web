import { createFieldComponent } from '../genericInput/index'

const { component, renderInput, classes } = createFieldComponent('text-field', 'text')

export {
  component as default,
  renderInput,
  classes,
}

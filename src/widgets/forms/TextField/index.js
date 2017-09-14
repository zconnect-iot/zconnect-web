import { createFieldComponent } from '../genericInput/index'

const { component, renderInput, classes } = createFieldComponent('TextField', 'text')

export {
  component as default,
  renderInput,
  classes,
}

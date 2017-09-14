import React, { Component } from 'react'
import { Field } from 'redux-form/immutable'
import BEMHelper from 'react-bem-helper'

import checkboxStyles from './style.scss'
import genericStyles from '../genericInput/style.scss'

// import checkedIcon from '../../../svg/icons/checkbox-checked.svg'
// import uncheckedIcon from '../../../svg/icons/checkbox-unchecked.svg'

const classes = new BEMHelper('CheckboxField')

/**
 * Specialised checkbox component.
 *
 * Renders a hidden `<input type="checkbox" />` along with a more easily-styled
 * `div` inside a container with a click handler.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Advanced_styling_for_HTML_forms#Check_boxes_and_radio_buttons}
 */
export class CheckboxInner extends Component {
  constructor(props) {
    super(props)
    this.state = { isChecked: !!props.initChecked }
  }

  toggle(on = !this.state.isChecked) {
    this.setState({ isChecked: on })
  }

  renderIcon() {
    /*
    return <div {...classes('input', null, checkboxStyles.input)}>
      {this.state.isChecked ? checkedIcon : uncheckedIcon}
    </div>
    */
  }

  render() {
    const { touched, error, warning } = this.props.meta
    return <div {...classes(null, null, genericStyles.control)}>
      <label
        htmlFor={this.props.name}
        {...classes('label', null, genericStyles.label)}
      >
        {this.props.label}
      </label>

      <div onClick={this.toggle} {...this.props.input}>
        <input
          type='checkbox'
          style={{display: 'none'}}
          checked={this.state.isChecked}
          {...this.props.input}
        />

        {this.renderIcon()}
      </div>

      {touched && (
        (error && renderError(error)) ||
        (warning && renderWarning(warning))
      )}
    </div>
  }
}

export default (props) => (<Field component={CheckboxInner} {...props} />)

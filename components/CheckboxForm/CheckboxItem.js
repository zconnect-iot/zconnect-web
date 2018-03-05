import React from 'react'
import PropTypes from 'prop-types'

export default class CheckboxItem extends React.Component {
  onChange = () => {
    const { checkbox, input } = this.props
    const newValue = [...input.value]
    if (event.target.checked) newValue.push(checkbox)
    else newValue.splice(newValue.indexOf(checkbox), 1)
    return input.onChange(newValue)
  }

  render() {
    const { checkbox, input } = this.props
    return (
      <input type="checkbox"
        name={checkbox}
        value={checkbox}
        checked={input.value.indexOf(checkbox) !== -1}
        onChange={this.onChange}
      />
    )
  }
}

CheckboxItem.propTypes = {
  checkbox: PropTypes.string.isRequired,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
}

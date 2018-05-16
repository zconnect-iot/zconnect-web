import React from 'react'
import PropTypes from 'prop-types'

/*
  ValueCheckbox provides a mechanism to store a value, in this case, the subscription id,
  inside the checkbox so that toggling off -> on returns the original value (if set) to
  redux form instead of just true.
  This makes it easy to identify newly checked subscription types for POSTing (vs previously
  enabled types that might need PATCHing if the severity has changed) in the container
  When unchecked it returns null, this is so that and saved id can be deleted if the
  input value changes to false upstream when the form reinitialises with updated values
*/

export default class ValueCheckbox extends React.Component {
  constructor(props) {
    super(props)
    // Save the id value internally if received
    if (props.input.value && typeof props.input.value === 'string') this.id = props.input.value
  }
  componentWillReceiveProps(props) {
    // Keep it updated
    if (props.input.value && typeof props.input.value === 'string') this.id = props.input.value
    // Delete it if value changes to false
    if (props.input.value === false) this.id = undefined
  }
  onChange = ({ target }) => {
    if (target.checked) return this.props.input.onChange(this.id || true)
    // Always uncheck with null so the stored id is not deleted when toggling
    // This change is ignored in the container if the previous value was false
    return this.props.input.onChange(null)
  }
  render() {
    return (<input type="checkbox" onChange={this.onChange} checked={!!this.props.input.value} />)
  }
}

ValueCheckbox.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
}

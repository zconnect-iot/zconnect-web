import React from 'react'
import PropTypes from 'prop-types'

/*
  ValueCheckbox provides a mechanism to store a value, in this case, the subscription id,
  inside the checkbox so that toggling off -> on returns the original value (if set) to
  redux form instead of just true.
  This makes it easy to identify newly checked subscription types for POSTing (vs previously
  enabled types that might need PATCHing if the severity has changed) in the container
*/

export default class ValueCheckbox extends React.Component {
  constructor(props) {
    super(props)
    this.value = props.input.value
  }
  componentWillReceiveProps(props) {
    if (props.input.value) this.value = props.input.value
  }
  onChange = ({ target }) => {
    if (target.checked) return this.props.input.onChange(this.value || true)
    return this.props.input.onChange(false)
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

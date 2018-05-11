import React from 'react'


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

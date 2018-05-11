import React from 'react'


export default class ValueSelect extends React.Component {
  onChange = value => this.props.input.onChange(+value)
  render() {
    return (<select onChange={this.onChange} {...this.props.input} value={+this.props.input.value}>
      {this.props.children}
    </select>)
  }
}

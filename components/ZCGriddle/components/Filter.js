import React from 'react'

import TextInput from './TextInput'


export default class Filter extends React.PureComponent {
  onChange = e => this.props.setFilter(e.target.value)

  render() {
    return (
      <div className="griddle__filter">
        <TextInput
          className="griddle__filterInput"
          icon="SEARCH"
          onChange={this.onChange}
          placeholder="Search"
        />
      </div>
    )
  }
}

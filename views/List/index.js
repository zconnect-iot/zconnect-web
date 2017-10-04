import React from 'react'
import PropTypes from 'prop-types'
import Griddle, { RowDefinition, ColumnDefinition } from 'griddle-react'

import { camelToTitleCase } from 'zc-web/util/string'

import './style.scss'

/** List layout: removes filtering, pagination and settings. */
export const Layout = ({ Table }) => <Table />

export const components = {
  Layout,
}

export const sortMethod = (data, column, sortAscending) => {
  console.log('sortMethod', data, column, sortAscending)
  data.sort()
  if (sortAscending) {
    data.reverse()
  }
  return data
}


export const column = (col, key) => {
  return typeof col !== 'string' ? col : (<ColumnDefinition
    key={col}
    id={col}
    title={camelToTitleCase(col)}
  />)
}

const List = props => (
  <Griddle components={components} {...props}>
    <RowDefinition>
      {props.columns.map(column)}
    </RowDefinition>
  </Griddle>
)

List.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ])).isRequired,
}

export default List

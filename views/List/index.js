import React from 'react'
import PropTypes from 'prop-types'
import Griddle, { RowDefinition, ColumnDefinition } from 'griddle-react'
import BEMHelper from 'react-bem-helper'

import { camelToTitleCase } from '../../util/string'

import listPlugin from './GriddlePlugin'

export const defineColumn = (col) => {
  if (typeof col !== 'string')
    return col
  return (
    <ColumnDefinition
      key={col}
      id={col}
      title={camelToTitleCase(col)}
    />
  )
}

const classes = new BEMHelper('List')

export const styleConfig = {
  classNames: {
    Cell: classes('cell').className,
    Filter: classes('filter').className,
    Loading: classes('loading').className,
    NextButton: classes('next-button').className,
    NoResults: classes('no-results').className,
    PageDropdown: classes('page-dropdown').className,
    Pagination: classes('pagination').className,
    PreviousButton: classes('previous-button').className,
    Row: classes('row').className,
    RowDefinition: classes('row-definition').className,
    Settings: classes('settings').className,
    SettingsToggle: classes('settings-toggle').className,
    Table: classes('table').className,
    TableBody: classes('table-body').className,
    TableHeading: classes('table-heading').className,
    TableHeadingCell: classes('table-heading-cell').className,
    TableHeadingCellAscending: classes('table-heading-cell-ascending').className.className,
    TableHeadingCellDescending: classes('table-heading-cell-descending').className,
  },
}

/**
 * List view.
 *
 * @param {(string|node)[]} props.columns a list of column IDs or definitions.
 * @param {Object} props.components a dict of components (see Griddle docs).
 *
 * Uses the Griddle plugin defined at {@link ./GriddlePlugin.js} to define
 * components.
 */
const List = props => (
  <Griddle
    plugins={[listPlugin]}
    {...props}
  >
    {props.columns && (
      <RowDefinition>
        {props.columns.map(defineColumn)}
      </RowDefinition>
    )}
  </Griddle>
)
List.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ])).isRequired,
  components: PropTypes.shape({
    Layout: PropTypes.func,
    Row: PropTypes.func,
  }),
  className: PropTypes.string,
  // eslint-disable-next-line react/disable-prop-types
  styleConfig: PropTypes.object,
}
List.defaultProps = {
  components: null,
  className: '',
  styleConfig,
}

export default List

/* eslint-disable react/no-unused-prop-types */
/**
 * A basic layout component, for convenience.
 *
 * Renders only the table (no filtering, pagination or settings).
 */
export const BasicLayout = props => <props.Table />
BasicLayout.propTypes = {
  Table: PropTypes.func.isRequired,
}
/* eslint-enable react/no-unused-prop-types */

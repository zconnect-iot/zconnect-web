import React from 'react'
import Griddle from 'griddle-react'

import './style.scss'

/** List layout: removes filtering, pagination and settings. */
export const Layout = ({ Table }) => <Table />

export const components = {
  Layout,
}

export default props => (
  <Griddle components={components} {...props} />
)

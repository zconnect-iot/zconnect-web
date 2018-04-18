import React from 'react'
import PropTypes from 'prop-types'

const CustomTableComponent = OriginalComponent => class CustomTableComponent extends React.Component {
  static contextTypes = {
    components: PropTypes.object
  }

  render() {
    return <this.context.components.TableBody />
  }
}

export default CustomTableComponent

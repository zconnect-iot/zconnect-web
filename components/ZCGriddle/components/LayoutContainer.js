// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { plugins, connect } from 'griddle-react'
import getContext from 'recompose/getContext'
import mapProps from 'recompose/mapProps'
import compose from 'recompose/compose'


const EnhancedLayout = OriginalComponent => compose(
  getContext({
    components: PropTypes.object,
  }),
  connect(
    state => ({
      className: plugins.LocalPlugin.selectors.classNamesForComponentSelector(state, 'Layout'),
      style: plugins.LocalPlugin.selectors.stylesForComponentSelector(state, 'Layout'),
      title: state.get('title'),
      hidePagination: state.get('hidePagination'),
      hideFilter: state.get('hideFilter'),
    }),
  ),
  mapProps(props => ({
    Table: props.components.Table,
    Pagination: props.components.Pagination,
    Filter: props.components.Filter,
    SettingsWrapper: props.components.SettingsWrapper,
    Style: props.components.Style,
    className: props.className,
    style: props.style,
    title: props.title,
    hidePagination: props.hidePagination,
    hideFilter: props.hideFilter,
  })),
)(OriginalComponent)

export default EnhancedLayout

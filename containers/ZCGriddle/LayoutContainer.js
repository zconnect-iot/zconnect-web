import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { plugins } from 'griddle-react'
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
  })),
)(OriginalComponent)

export default EnhancedLayout

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
      pageSize: plugins.LocalPlugin.selectors.pageSizeSelector(state),
      recordCount: state.getIn(['pageProperties', 'recordCount']),
      dataSize: plugins.LocalPlugin.selectors.filteredDataSelector(state).size,
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
    // When griddle is controlled recordCount is passed as a prop and present in state
    // otherwise the filteredDataSelector can be used to determine whether pagination
    // should be shown
    hidePagination: !props.dataSize || props.hidePagination ||
      ((props.recordCount || props.dataSize) < props.pageSize),
    hideFilter: props.hideFilter,
  })),
)(OriginalComponent)

export default EnhancedLayout

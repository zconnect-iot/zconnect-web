/*
  This is used by AsyncList to show a Spinner when fetching the next page
  Requires an api prop to be passed to the Griddle
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect, plugins } from 'griddle-react'
import { compose, mapProps, getContext } from 'recompose'


const NoResultsContainer = OriginalComponent => compose(
  getContext({
    components: PropTypes.object,
  }),
  connect(
    state => ({
      className: plugins.LocalPlugin.selectors.classNamesForComponentSelector(state, 'NoResults'),
      style: plugins.LocalPlugin.selectors.stylesForComponentSelector(state, 'NoResults'),
      api: state.get('api'),
    }),
  ),
  mapProps((props) => {
    const { components, ...otherProps } = props
    return {
      NoResults: components.NoResults,
      ...otherProps,
    }
  }),
)(props => <OriginalComponent {...props} />)

export default NoResultsContainer

import React from 'react'
import PropTypes from 'prop-types'

import { zcApiShapeJS } from 'zc-core/utils/propTypes'

import ZCGriddle from '../../components/ZCGriddle'
import { NoResults, NoResultsContainer } from '../../components/ZCGriddle/components'


export default class AsyncList extends React.Component {
  componentDidMount() {
    this.props.fetchResults()
  }
  componentWillReceiveProps(props) {
    if (props.pageProperties.currentPage !== this.props.pageProperties.currentPage) {
      props.fetchResults()
    }
  }
  render() {
    const { data, children, api, components, ...griddleProps } = this.props
    return (<ZCGriddle
      data={api.success ? data : []}
      components={{
        NoResults,
        NoResultsContainer,
        ...components,
      }}
      api={api}
      {...griddleProps}
    >
      {children}
    </ZCGriddle>)
  }
}

AsyncList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  fetchResults: PropTypes.func.isRequired,
  components: PropTypes.shape(),
  api: zcApiShapeJS.isRequired,
  pageProperties: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    recordCount: PropTypes.number.isRequired,
  }).isRequired,
}

AsyncList.defaultProps = {
  components: {},
}

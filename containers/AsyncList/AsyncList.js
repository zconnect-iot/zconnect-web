import React from 'react'
import PropTypes from 'prop-types'

import ZCGriddle from '../../components/ZCGriddle'

import { NoResults, NoResultsContainer } from '../../components/ZCGriddle/components'


export default class AsyncList extends React.Component {
  componentDidMount() {
    this.props.fetchResults()
  }
  componentWillReceiveProps(props) {
    if (props.currentPage !== this.props.currentPage) props.fetchResults()
  }
  render() {
    const { data, recordCount, children, pageSize, currentPage, api, ...griddleProps } = this.props
    return (<ZCGriddle
      data={api.success ? data : []}
      events={{
        onNext: this.props.onNext,
        onPrevious: this.props.onPrevious,
        onGetPage: this.props.onGetPage,
        onFilter: this.props.onFilter,
        onSort: this.props.onSort,
      }}
      components={{
        // NoResults, // TODO: Figure out WTF is going on with these custom components
        NoResultsContainer,
      }}
      pageProperties={{
        pageSize,
        currentPage,
        recordCount,
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
  recordCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  fetchResults: PropTypes.func.isRequired,
}

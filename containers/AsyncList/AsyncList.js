import React from 'react'

import ZCGriddle from '../ZCGriddle'

export default class AsyncList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
    }
  }
  onNext = () => this.onGetPage(this.state.currentPage + 1)
  onPrevious = () => this.onGetPage(this.state.currentPage - 1)
  onGetPage = currentPage => this.setState({ currentPage }, () => this.props.fetchResults(currentPage))
  render() {
    const { data, recordCount } = this.props
    const { currentPage } = this.state
    return (<ZCGriddle
      data={data}
      currentPage={currentPage}
      recordCount={recordCount}
      onNext={this.onNext}
      onPrevious={this.onPrevious}
      onGetPage={this.onGetPage}
    />)
  }
}

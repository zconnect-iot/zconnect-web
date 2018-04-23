import React from 'react'
import { PropTypes } from 'prop-types'

import { range } from 'lodash'
import { mapProps, withProps } from 'recompose'

import { ModalContainer } from '../views'
import { Content } from './'


export default class PaginatedContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSelectorOpen: false,
    }
  }
  togglePageSelector = () => this.setState({ pageSelectorOpen: !this.state.pageSelectorOpen })
  render() {
    const { currentPage, pageSize, onNext, onPrevious, maxPages, onGetPage, children,
      actionItems, ...contentProps } = this.props
    const { pageSelectorOpen } = this.state
    if (currentPage > 1) actionItems.push({ icon: 'ARROW_BACK', action: onPrevious })
    actionItems.push({ title: `Page ${currentPage}`, action: this.togglePageSelector })
    if (currentPage < maxPages) actionItems.push({ icon: 'ARROW_FORWARD', action: onNext })
    return (
      <Content
        actionItems={actionItems}
        {...contentProps}
      >
        <ModalContainer title="Go to page" visible={pageSelectorOpen} onClose={this.togglePageSelector}>
          <select onChange={onGetPage} value={currentPage}>
            {range(1, maxPages + 1).map(i => <option value={i} key={i}>{i}</option>)}
          </select>
        </ModalContainer>
        {children}
      </Content>
    )
  }
}

PaginatedContent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  maxPages: PropTypes.number.isRequired,
  onGetPage: PropTypes.func.isRequired,
}

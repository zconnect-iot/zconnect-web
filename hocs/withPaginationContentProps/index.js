import React from 'react'
import { PropTypes } from 'prop-types'

import { range } from 'lodash'

import { ModalContainer } from '../../views'


export default function withPaginationContentProps() {
  return function withPaginationContentPropsEnhancer(WrappedComponent) {
    class WithPaginationContentProps extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          pageSelectorOpen: false,
        }
      }
      onGetPage = (page) => {
        this.props.onGetPage(page)
        this.togglePageSelector()
      }
      togglePageSelector = () => this.setState({ pageSelectorOpen: !this.state.pageSelectorOpen })
      render() {
        const { currentPage, pageSize, onNext, onPrevious, maxPages, onGetPage, ...props } = this.props
        const { pageSelectorOpen } = this.state
        const actionItems = []
        if (currentPage > 1) actionItems.push({ icon: 'ARROW_BACK', action: onPrevious })
        actionItems.push({ title: `Page ${currentPage}`, action: this.togglePageSelector })
        if (currentPage < maxPages) actionItems.push({ icon: 'ARROW_FORWARD', action: onNext })
        return (
          <div>
            <ModalContainer title="Go to page" visible={pageSelectorOpen} onClose={this.togglePageSelector}>
              <select onChange={onGetPage} value={currentPage}>
                {range(1, maxPages + 1).map(i => <option value={i} key={i}>{i}</option>)}
              </select>
            </ModalContainer>
            <WrappedComponent
              actionItems={actionItems}
              currentPage={currentPage}
              pageSize={pageSize}
              {...props}
            />
          </div>
        )
      }
    }
    WithPaginationContentProps.propTypes = {
      currentPage: PropTypes.number.isRequired,
      pageSize: PropTypes.number.isRequired,
      onNext: PropTypes.func.isRequired,
      onPrevious: PropTypes.func.isRequired,
      maxPages: PropTypes.number.isRequired,
      onGetPage: PropTypes.func.isRequired,
    }
    WithPaginationContentProps.displayName = `withPaginationContentProps(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    return WithPaginationContentProps
  }
}

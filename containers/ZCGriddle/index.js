import React from 'react'
import PropTypes from 'prop-types'
import Griddle from 'griddle-react'

import LayoutContainer from './LayoutContainer'
import Filter from './Filter'
import FilterLayout from './FilterLayout'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'

import './style.scss'


export default function ZCGriddle(props) {
  const { data, title, className, components, children, currentPage, pageSize,
    recordCount, onNext, onPrevious, onGetPage, ...griddleProps } = props
  return (<Griddle
    data={data}
    styleConfig={{
      classNames: {
        Layout: className,
      },
    }}
    title={title}
    pageProperties={{
      pageSize,
      currentPage,
      recordCount,
    }}
    events={{
      onNext,
      onPrevious,
      onGetPage,
    }}
    components={{
      LayoutContainer,
      Layout: FilterLayout,
      Filter,
      NextButton,
      PreviousButton,
      ...components,
    }}
    {...griddleProps}
  >
    {children}
  </Griddle>)
}

ZCGriddle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  recordCount: PropTypes.number,
  title: PropTypes.string,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

const emptyObject = {}

ZCGriddle.defaultProps = {
  currentPage: 1,
  pageSize: 10,
  recordCount: 0,
  title: '',
  components: emptyObject,
  className: '',
  children: null,
}

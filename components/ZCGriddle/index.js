import React from 'react'
import PropTypes from 'prop-types'
import Griddle from 'griddle-react'

import { FilterLayout } from './components'

import './style.scss'


export default function ZCGriddle(props) {
  const { data, className, components, children, ...griddleProps } = props
  return (<Griddle
    data={data}
    styleConfig={{
      classNames: {
        Layout: className,
      },
    }}
    components={{
      Layout: FilterLayout,
      ...components,
    }}
    {...griddleProps}
  >
    {children}
  </Griddle>)
}

ZCGriddle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  title: '',
  components: emptyObject,
  className: '',
  children: null,
}

import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'
import Logo from './Logo'

const classes = BEMHelper({ name: 'Header' })

export default function Header(props) {
  const left = props.leftContent || <Logo small />
  const right = props.rightContent || null
  return (
    <Row {...classes()}>
      <Col smOffset={2} sm={8} style={{ display: 'flex' }}>
        {left && <div {...classes('left-content')}>{left}</div>}
        {right && <div {...classes('right-content')}>{right}</div>}
      </Col>
    </Row>
  )
}

const nodeOrArray = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
])

Header.propTypes = {
  children: nodeOrArray,
  leftContent: nodeOrArray,
  rightContent: nodeOrArray,
}

Header.defaultProps = {
  children: null,
  leftContent: null,
  rightContent: null,
}

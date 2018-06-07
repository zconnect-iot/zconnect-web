import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'

import { Logo, Button } from '../'

import './style.scss'


const classes = BEMHelper({ name: 'Header' })

export default function Header(props) {
  const left = props.leftContent || <Button {...classes('Logo')} route="/"><Logo small /></Button>
  const right = props.rightContent || null
  return (
    <Row {...classes()}>
      <Col xs={12} lgOffset={1} lg={10}>
        <Row between="xs">
          <Col>{left}</Col>
          {right && <Col>{right}</Col>}
        </Row>
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

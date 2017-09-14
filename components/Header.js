import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'
import Logo from './Logo'

const classes = BEMHelper({ name: 'Header' })

export default function Header() {
  return (
    <Row {...classes()}>
      <Col smOffset={2} sm={8}>
        <Logo small />
      </Col>
    </Row>
  )
}

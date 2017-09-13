import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'
import { Button } from 'components'


const classes = BEMHelper({ name: 'Content' })

export default function Content({ title, actionItems, children }) {
  return (
    <Col {...classes()} xs={12}>
      <Row {...classes('header')}>
        <Col {...classes('headerCenter')} smOffset={2} sm={8} xs={12}>
          <h4 {...classes('title')}>{title}</h4>
          {actionItems.map(item => (
            <Button {...classes('button')} key={item.title} hollow onClick={item.action}>
              <img alt="action icon" src={item.icon} />
              {item.title}
            </Button>
          ))}
        </Col>
      </Row>
      <Row {...classes('body')}>
        <Col smOffset={2} sm={8}>
          {children}
        </Col>
      </Row>
    </Col>
  )
}

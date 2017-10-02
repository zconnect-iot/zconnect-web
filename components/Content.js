import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'
import { Button, Icon } from '../components'


const classes = BEMHelper({ name: 'Content' })

export default function Content({ title, subtitle, actionItems, children }) {
  return (
    <Col {...classes()} xs={12}>
      <Row {...classes('header')}>
        <Col {...classes('headerCenter')} smOffset={2} sm={8} xs={12}>
          <div {...classes('title')}>
            <h4>{title}</h4>
            <h6>{subtitle}</h6>
          </div>
          {actionItems.map(item => (
            <Button {...classes('button')} key={item.title} hollow {...item}>
              <Icon name={item.icon} size={24} />
              {item.title}
            </Button>
          ))}
        </Col>
      </Row>
      <Row {...classes('body')}>
        <Col smOffset={2} sm={8} xs={12}>
          {children}
        </Col>
      </Row>
    </Col>
  )
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actionItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

Content.defaultProps = {
  subtitle: '',
}

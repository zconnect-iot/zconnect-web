import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'

import { Button, Icon } from '../'

import './style.scss'


const classes = BEMHelper({ name: 'Content' })

/**
  Structural / presentational component for passing as child of `<Page />`

  Provides a header with optional action items
*/
export default function Content(props) {
  const { title, subtitle, header, actionItems, children, className, image } = props
  return (
    <Row {...classes(null, null, className)}>
      <Col xs={12}>
        {(title || image) && <Row {...classes('header')}>
          <Col {...classes('headerCenter')} xs={12} lgOffset={1} lg={10}>
            <div {...classes('title')}>
              {image && image}
              <div {...classes('titleRight')}>
                {title && <h4>{title}</h4>}
                {subtitle && <h6>{subtitle}</h6>}
              </div>
            </div>
            { header &&
              <div {...classes('header')}>
                <h4>{header}</h4>
              </div>
            }
            <div {...classes('actions')}>
              {actionItems.map(item => (
                <Button key={item.title || item.icon} hollow {...item} {...classes('button', null, item.className)}>
                  {item.icon && <Icon name={item.icon} size={24} />}
                  {item.title && <span>{item.title}</span>}
                </Button>
              ))}
            </div>
          </Col>
        </Row>}
        <Row {...classes('body')}>
          <Col xs={12} lgOffset={1} lg={10}>
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Content.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  header: PropTypes.string,
  actionItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  image: PropTypes.node,
}

Content.defaultProps = {
  subtitle: '',
  actionItems: [],
  className: '',
  title: '',
  header: '',
  image: null,
}

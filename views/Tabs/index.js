import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { TabLink as Link, TabContent as Content } from 'react-tabs-redux'

import './style.scss'

export { Tabs } from 'react-tabs-redux'

export const classes = new BEMHelper('Tabs')

export const TabLinkList = props => (
  <div {...classes('link-list')}>
    {props.children}
  </div>
)

TabLinkList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

// The `children` prop isn't defined for Link or Content.
/* eslint-disable react/prop-types */

export const TabLink = props => (
  <div {...classes('link-wrap')}>
    <Link {...props} {...classes('link')}>{props.children}</Link>
  </div>
)

TabLink.propTypes = Object.assign({
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}, Link.propTypes)

export const TabContent = props => (
  <Content {...classes('content')} {...props}>
    {props.children}
  </Content>
)

TabContent.propTypes = Content.propTypes

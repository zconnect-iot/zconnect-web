import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { TabLink as Link, TabContent as Content } from 'react-tabs-redux'

import './style.scss'

/**
 * Tabs component.
 *
 * This module provides simple wrappers to the `react-tabs-redux` tab
 * components for ease of styling. Default styles are in {@link ./style.scss}.
 *
 * @example
 * <Tabs>
 *   <TabLinkList>
 *     <TabLink to="atRisk"><span>At risk</span></TabLink>
 *     <TabLink to="needsData"><span>Needs data</span></TabLink>
 *   </TabLinkList>
 *
 *   <TabContent for="atRisk">
 *     <h2>At risk content</h2>
 *     <p>These buildings are at risk.</p>
 *   </TabContent>
 *
 *   <TabContent for="needsData">
 *     <h2>Needs data collection content</h2>
 *     <p>These buildings need data collection.</p>
 *   </TabContent>
 * </Tabs>
 *
 * Alternatively the components from `react-tabs-redux` can be used in place of
 * any here. @see {@link https://github.com/patrik-piskay/react-tabs-redux}.
 */
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
}, Link.propTypes)

export const TabContent = props => (
  <Content {...classes('content')} {...props}>
    {props.children}
  </Content>
)

TabContent.propTypes = Content.propTypes

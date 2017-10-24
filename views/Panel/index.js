import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Icon } from '../../components'

import './style.scss'

const classes = new BEMHelper('Panel')

export default class Panel extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: props.collapsed || false,
    }
  }
  componentWillReceiveProps(props) {
    if (props.collapsed !== undefined) this.setState({
      collapsed: props.collapsed,
    })
  }
  toggleCollapsed = () => this.setState({ collapsed: !this.state.collapsed })
  render() {
    const { title, image, icon, collapsible, className, children, onClick } = this.props
    const { collapsed } = this.state
    return (
      <div {...classes(null, collapsed ? 'collapsed' : null, className)}>
        <div {...classes('header')}>
          { image ? <img {...classes('image')} src={image} alt="Device Icon" /> : null }
          { icon ? <Icon name={icon} /> : null }
          { title }
          { onClick ? <Icon size={30} name="CHEVRON_RIGHT" onClick={onClick} /> : null}
        </div>
        <div {...classes('body')}>
          { children }
        </div>
        { collapsible ?
          <div {...classes('footer')} onClick={this.toggleCollapsed} role="button" tabIndex={0}>
            <Icon name={`CHEVRON_${collapsed ? 'DOWN' : 'UP'}`} size={30} />
          </div> : null
        }
      </div>
    )
  }
}

Panel.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
}

Panel.defaultProps = {
  title: undefined,
  image: null,
  icon: '',
  children: null,
  className: '',
  collapsible: false,
  collapsed: undefined,
  onClick: null,
}

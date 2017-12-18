import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Icon, Button } from '../../components'

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
  renderActions = actions => actions.map(action => (<Button key={action.title} {...action}>
    {action.title}
  </Button>))
  render() {
    const { title, renderIcon, collapsible, className, children, onClick, actions,
      renderStatic, onClickLabel, subtitle } = this.props
    const { collapsed } = this.state
    return (
      <div {...classes(null, collapsed ? 'collapsed' : null, className)}>
        <div {...classes('header')}>
          { renderIcon ? renderIcon(this.props) : null }
          <div {...classes('headerMiddle')}>
            <h3>{ title }</h3>
            <div {...classes('subtitle')}>{ subtitle }</div>
          </div>
          { onClick ? <span {...classes('onClick')} onClick={onClick} role="button" tabIndex={0}>
            {onClickLabel}
            <Icon size={30} name="CHEVRON_RIGHT" />
          </span> : null }
          { actions.length ? this.renderActions(actions) : null }
        </div>
        {renderStatic ? renderStatic(this.props) : null}
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
  renderIcon: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    route: PropTypes.string,
  })),
  renderStatic: PropTypes.func,
  onClickLabel: PropTypes.string,
  subtitle: PropTypes.string,
}

Panel.defaultProps = {
  title: undefined,
  children: null,
  className: '',
  collapsible: false,
  collapsed: undefined,
  onClick: null,
  actions: [],
  renderStatic: undefined,
  renderIcon: undefined,
  onClickLabel: '',
  subtitle: '',
}

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import { logout } from 'zc-core/auth/actions' // eslint-disable-line import/extensions
import BEMHelper from 'react-bem-helper'

import NavButton from '../../components/NavButton'

import './style.scss'

const classes = BEMHelper({ name: 'Navbar' })

class NavbarUnconnected extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    })).isRequired,
    logout: PropTypes.func.isRequired,
  }
  onLogout = () => this.props.logout()
  render() {
    const { items } = this.props
    return (
      <Row {...classes()}>
        <Col xs={12} lgOffset={1} lg={10}>
          <Row>
            {items.map(item => (<Col xs sm={1} key={item.title} {...classes('item')}>
              <NavButton
                {...item}
              />
            </Col>))}
            <Col xs sm={1} {...classes('item')} key="Logout">
              <NavButton title="Logout" icon="POWER" action={this.onLogout} active={false} />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

const Connected = connect(
  null,
  mapDispatchToProps,
)(NavbarUnconnected)

export default function Navbar({ ...props }) {
  return <Connected {...props} />
}

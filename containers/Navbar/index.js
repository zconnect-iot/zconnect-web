import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import { logout } from 'zc-core/auth/actions'
import BEMHelper from 'react-bem-helper'

import NavButton from '../../components/NavButton'

import './style.scss'

const classes = BEMHelper({ name: 'Navbar' })

class Navbar extends React.Component {
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
        <Col smOffset={2} sm={8}>
          {items.map(item => (<NavButton
            key={item.title}
            {...item}
          />))}
          <NavButton title="Logout" icon="POWER" action={this.onLogout} active={false} />
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(
  null,
  mapDispatchToProps,
)(Navbar)

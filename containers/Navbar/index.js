import React from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
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
      icon: PropTypes.string.isRequired,
    })).isRequired,
    navigate: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }
  onLogout = () => this.props.logout()
  render() {
    const { navigate, items, location } = this.props
    return (
      <Row {...classes()}>
        <Col smOffset={2} sm={8}>
          {items.map(item => (<NavButton
            key={item.title}
            active={item.route === location.pathname}
            {...item}
            navigate={navigate}
          />))}
          <NavButton title="Logout" icon="POWER" action={this.onLogout} active={false} />
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  navigate: route => dispatch(push(route)),
})

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Navbar))

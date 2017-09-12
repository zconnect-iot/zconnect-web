import React from 'react'
import PropTypes from 'react-proptypes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
import { logout } from 'zc-core/auth/actions'

import NavButton from 'components/NavButton'

import './style.scss'

class Nav extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })).isRequired,
    navigate: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }
  onLogout = () => this.props.logout()
  render() {
    const { navigate, items, location } = this.props
    return (
      <nav className="Nav">
        {items.map(item => (<NavButton
          key={item.title}
          active={item.route === location.pathname}
          {...item}
          navigate={navigate}
        />))}
        <NavButton title="Logout" action={this.onLogout} />
      </nav>
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
)(Nav))

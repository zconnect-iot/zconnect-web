import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'react-flexbox-grid'
import classnames from 'classnames'

import Navbar from '../../containers/Navbar'
import Header from '../Header'

import './style.scss'

/**
  To allow the nested `<Link />`'s and `<Button/>`'s to be used with any routing tech, `<Page/>`
  needs the navItems, current location path and a navigate function to pass down to the buttons
  so that they can show active state if their route matches the current one.

  The subscribe/unsubscribe ensures that changes to the location prop aren't blocked by any
  component in between that implements shouldComponentUpdate (like connect) so that the
  withPageContext HOC always updates when the Page location prop changes

  If a NavBar component is passed it will render this instead of the built in NavBar
*/

export default class Page extends React.Component {
  constructor(props) {
    super(props)
    this.subscribers = {}
    this.subId = 0
  }
  getChildContext() {
    return {
      page: {
        navigate: this.props.navigate,
        subscribe: this.addSubscriber,
        unsubscribe: this.removeSubscriber,
        location: this.props.location,
      },
    }
  }
  componentWillReceiveProps(next) {
    if (next.location !== this.props.location)
      Object.values(this.subscribers).forEach(s => s(next.location))
  }
  addSubscriber = (s) => {
    this.subscribers[this.subId += 1] = s
    return this.subId
  }
  removeSubscriber = s => delete this.subscribers[s]
  render() {
    const { children, navItems, headerRightContent, className } = this.props
    return (
      <Grid fluid className={classnames('Page', className)}>
        <Header rightContent={headerRightContent} />
        { this.props.NavBar ? <this.props.NavBar /> : <Navbar items={navItems} />}
        {children}
      </Grid>
    )
  }
}

Page.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    action: PropTypes.func,
  })),
  NavBar: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  navigate: PropTypes.func.isRequired,
  headerRightContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  location: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Page.defaultProps = {
  headerRightContent: null,
  NavBar: null,
  navItems: [],
  className: '',
}

Page.childContextTypes = {
  page: PropTypes.shape({
    navigate: PropTypes.func,
    subscribe: PropTypes.func,
    location: PropTypes.string,
  }),
}

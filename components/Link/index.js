import React from 'react'

import { withPageContext } from '../../hocs'

import SimpleLink from './SimpleLink'

/**
  Provides 3 possible behaviours depending on props provided. In order of priority:

  1. href - Acts like native anchor tag and navigates browser to that url
  2. route - Calls the navigate function provided by Page context passing the route
  3. action - A callback function

  Default export wraps SimpleLink with getPageContext to provide the navigate
  functionality. This means SimpleLink can only be used to call the action prop or href
*/

const LinkWithNav = withPageContext()(SimpleLink)

function Link(props) {
  return <LinkWithNav {...props} />
}

Link.propTypes = SimpleLink.propTypes
Link.defaultProps = SimpleLink.defaultProps

export { SimpleLink }
export default Link

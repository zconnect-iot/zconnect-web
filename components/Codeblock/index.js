import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

export default function Codeblock({ dictionary, children }) {
  return (
    <div className="Codeblock">
      <pre className="Codeblock__pre">
        { children || JSON.stringify(dictionary, null, '  ') }
      </pre>
    </div>
  )
}

Codeblock.propTypes = {
  dictionary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Codeblock.defaultProps = {
  dictionary: null,
  children: null,
}

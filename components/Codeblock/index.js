import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './styles.scss'


export default function Codeblock({ dictionary, children, className }) {
  const codeString = children || JSON.stringify(dictionary, null, '  ')
  return (
    <div className={classnames('Codeblock', className)}>
      <pre className="Codeblock__pre">
        {codeString}
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
  className: PropTypes.string,
}

Codeblock.defaultProps = {
  dictionary: null,
  children: null,
  className: '',
}

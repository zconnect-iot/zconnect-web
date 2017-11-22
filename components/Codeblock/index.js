import React from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light'
import json from 'react-syntax-highlighter/languages/hljs/json'
import { googlecode } from 'react-syntax-highlighter/styles/hljs'

registerLanguage('json', json)

export default function Codeblock({ dictionary, children, language, ...props }) {
  const codeString = children || JSON.stringify(dictionary, null, '  ')
  return (
    <div className="Codeblock">
      <SyntaxHighlighter language={language} style={googlecode} {...props}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

Codeblock.propTypes = {
  dictionary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  language: PropTypes.oneOf([
    'json',
  ]),
}

Codeblock.defaultProps = {
  dictionary: null,
  children: null,
  language: 'json',
}

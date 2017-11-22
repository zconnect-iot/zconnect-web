import React from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light'
import js from 'react-syntax-highlighter/languages/hljs/javascript'
import json from 'react-syntax-highlighter/languages/hljs/json'
import python from 'react-syntax-highlighter/languages/hljs/python'
import { docco } from 'react-syntax-highlighter/styles/hljs'

registerLanguage('javascript', js)
registerLanguage('json', json)
registerLanguage('python', python)

export default function Codeblock({ dictionary, children, language, ...props }) {
  const codeString = children || JSON.stringify(dictionary, null, '  ')
  return (
    <div className="Codeblock">
      <SyntaxHighlighter language={language} style={docco} {...props}>
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
    'javascript',
    'json',
    'python',
  ]),
}

Codeblock.defaultProps = {
  dictionary: null,
  children: null,
  language: 'json',
}

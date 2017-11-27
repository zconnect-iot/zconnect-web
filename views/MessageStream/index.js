import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { Message } from '../../components'

import './style.scss'

const classes = BEMHelper('MessageStream')


export default class MessageStream extends React.PureComponent {
  render() {
    const { messages, MessageIcon, className } = this.props
    return (<div {...classes(null, null, className)}>
      {messages.valueSeq().map((message) => {
        const id = message.get('issue_id')
        return (<Message
          key={id}
          type={message.get('type')}
          renderIcon={MessageIcon}
          time={message.get('ts')}
          title={message.get('category')}
          subtitle={message.get('message')}
          id={id}
        />)
      })}
    </div>)
  }
}

MessageStream.propTypes = {
  messages: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    category: PropTypes.string,
  })).isRequired,
  MessageIcon: PropTypes.func,
  className: PropTypes.string,
}

MessageStream.defaultProps = {
  MessageIcon: null,
  className: '',
}

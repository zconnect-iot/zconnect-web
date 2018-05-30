import React from 'react'
import PropTypes from 'prop-types'
import { mapProps } from 'recompose'
import XDate from 'xdate'

import { Message, Icon } from '../../../components'
import { Tooltip } from '../../../widgets'

import { classes } from './ActivityStream'


const categoryIconMap = {
  maintenance: 'SPANNER',
  system: 'DIAL',
  'business metric': 'HEART_BEAT',
}

const getColorForSeverity = (severity) => {
  if (severity < 30) return 'info'
  if (severity < 40) return 'warning'
  return 'danger'
}

const renderIcon = ({ category, severity }) => (
  <div {...classes('Icon', null, `bg-${getColorForSeverity(severity)}`)}>
    <Icon
      name={categoryIconMap[category] || 'INFO'}
      size={40}
    />
  </div>
)

renderIcon.propTypes = {
  category: PropTypes.string.isRequired,
  severity: PropTypes.number.isRequired,
}

const renderTitle = ({ description, notify }) => (<span>
  {description}
  {notify && (<Tooltip icon="DONE_ALL" size={20} color="success">
    You should have been notified about this event
  </Tooltip>)}
</span>)

renderTitle.propTypes = {
  description: PropTypes.string.isRequired,
  notify: PropTypes.bool.isRequired,
}

const rewireProps = props => ({
  ...props,
  title: renderTitle(props),
  time: XDate(props.created_at, true),
  renderIcon,
  className: classes('Activity').className,
})

export default mapProps(rewireProps)(props => (
  <div {...classes('ActivityWrapper')}>
    <Message {...props} />
  </div>
))

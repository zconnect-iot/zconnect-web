import React from 'react'
import { connect, plugins } from 'griddle-react'
import { mapProps, compose } from 'recompose'
import XDate from 'xdate'

import { Message, Icon } from '../../components'
import { Tooltip } from '../../widgets'

import { classes } from './'


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

const renderIcon = ({ category, severity }) => (<div {...classes('Icon')}>
  <div {...classes('IconSeverity', null, `bg-${getColorForSeverity(severity)}`)} />
  <Icon
    name={categoryIconMap[category] || 'INFO'}
    size={40}
  />
</div>)

export default compose(
  connect((state, props) => {
    const rowData = plugins.LocalPlugin.selectors.rowDataSelector(state, props)
    return rowData
  }),
  mapProps(props => ({
    ...props,
    title: (<span>
      {props.description}
      {props.notify && <Tooltip icon="DONE_ALL" size={20} color="success">You should have been notified about this event</Tooltip>}
    </span>),
    time: XDate(props.created_at, true),
    // subtitle: props.category,
    renderIcon,
    className: classes('Activity').className,
  })),
)(Message)

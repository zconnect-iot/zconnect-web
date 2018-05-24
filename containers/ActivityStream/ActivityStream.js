import React from 'react'
import BEMHelper from 'react-bem-helper'
import PropTypes from 'prop-types'

import { activityShape } from 'zc-core/utils/propTypes'

import { Button } from '../../components'

import Activity from './Activity'
import './style.scss'


export const classes = BEMHelper({ name: 'ActivityStream' })

export default class ActivityStream extends React.PureComponent {
  componentDidMount() {
    this.props.fetchActivities()
  }
  componentWillReceiveProps(props) {
    const { start, end, resetPage } = this.props
    if (props.start !== start || props.end !== end) {
      resetPage()
      props.fetchActivities()
    }
  }
  getMore = () => {
    this.props.fetchActivities()
  }
  render() {
    const { activities, moreAvailable } = this.props
    return (
      <div {...classes()}>
        {activities.map(activity => (<Activity key={activity.id} {...activity} />))}
        {moreAvailable && <Button color="success" action={this.getMore}>More...</Button>}
      </div>
    )
  }
}

ActivityStream.propTypes = {
  activities: PropTypes.arrayOf(activityShape).isRequired,
  fetchActivities: PropTypes.func.isRequired,
}

import React from 'react'
import BEMHelper from 'react-bem-helper'
import PropTypes from 'prop-types'

import { activityShape, zcApiShapeJS } from 'zc-core/utils/propTypes'

import { withSpinner } from '../../../hocs'
import { Button, Spinner } from '../../../components'

import Activity from './Activity'
import './style.scss'

const SpinButton = withSpinner()(Button)

export const classes = BEMHelper({ name: 'ActivityStream' })

export default class ActivityStreamComponent extends React.PureComponent {
  componentDidMount() {
    this.props.fetchActivities()
  }
  componentWillReceiveProps(props) {
    const { start, end } = this.props
    if (props.start !== start || props.end !== end)
      props.fetchActivities()
  }
  componentWillUnmount() {
    this.props.wipeApi()
  }
  getMore = () => this.props.fetchActivities()
  render() {
    const { api, activities, moreAvailable, errorMessage } = this.props
    if (api.error) return <span className="text-danger">{errorMessage}</span>
    if (activities.length) return (
      <div {...classes()}>
        {activities.map(activity => (<Activity key={activity.id} {...activity} />))}
        {moreAvailable && <SpinButton
          {...classes('More')}
          disabled={api.pending}
          spinnerSize={24}
          pending={api.pending}
          color="success"
          action={this.getMore}
        >
          More...
        </SpinButton>}
      </div>
    )
    if (api.success) return (
      <div {...classes()}>
        No activities found for date range selected
      </div>
    )
    return <Spinner />
  }
}

ActivityStreamComponent.propTypes = {
  api: zcApiShapeJS.isRequired,
  activities: PropTypes.arrayOf(activityShape).isRequired,
  fetchActivities: PropTypes.func.isRequired,
  wipeApi: PropTypes.func.isRequired,
  moreAvailable: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
}

ActivityStreamComponent.defaultProps = {
  start: 0,
  end: 0,
}

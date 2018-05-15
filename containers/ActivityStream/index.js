import React from 'react'
import BEMHelper from 'react-bem-helper'

import { Panel } from '../../views'
import { TableBody, TableContainer } from '../../components/ZCGriddle/components'

import { AsyncListWithState } from '../'

import Activity from './Activity'
import './style.scss'


export const classes = BEMHelper({ name: 'ActivityStream' })

export default class ActivityStream extends React.Component {
  componentDidMount() {
    // this.props.getRef(this)
    // this.props.fetchSubs()
  }
  componentWillReceiveProps(props) {
    // if (props.isDirty !== this.props.isDirty) props.onChange()
  }
  render() {
    const { deviceId } = this.props
    return (
      <AsyncListWithState
        endpoint="getActivities"
        storeKey="activities"
        params={{ deviceId }}
        hideFilter
        components={{
          Row: Activity,
          TableContainer,
          TableBody,
        }}
        styleConfig={{
          classNames: {
            Layout: classes().className,
          },
        }}
      />
    )
  }
}

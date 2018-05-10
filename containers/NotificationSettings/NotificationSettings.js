import React from 'react'
import { Row, Col } from 'react-flexbox-grid'


export default class NotificationSettings extends React.Component {
  componentDidMount() {
    this.props.fetchSubs()
  }
  render() {
    console.log(this.props);
    return (
      <div>Hello</div>
    )
  }
}

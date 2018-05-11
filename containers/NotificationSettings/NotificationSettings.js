import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'

import { Button } from '../../components'

import CategoryRow from './components/CategoryRow'

import './style.scss'


export const classes = BEMHelper({ name: 'SubsSettings' })

class NotificationSettings extends React.Component {
  componentDidMount() {
    this.props.fetchSubs()
  }
  render() {
    const { categories, severities, types, dirty, submitForm } = this.props
    return (
      <div {...classes()}>
        <Row>
          <Col xs />
          <Col xs />
          {types.map(([label]) => (<Col xs key={label}>
            {label}
          </Col>))}
        </Row>
        {categories.map(category => (<CategoryRow
          key={category}
          title={category}
          severities={severities}
          types={types}
        />))}
        {dirty && <Button
          {...classes('save')}
          color="success"
          action={submitForm}
        >
          Save
        </Button>}
      </div>
    )
  }
}

export default reduxForm({
  form: 'subscriptions',
  enableReinitialize: true,
})(NotificationSettings)

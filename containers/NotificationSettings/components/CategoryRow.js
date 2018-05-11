import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Field } from 'redux-form/immutable'
import { capitalize } from 'lodash'

import { classes } from '../NotificationSettings'

import ValueCheckbox from './ValueCheckbox'
import ValueSelect from './ValueSelect'


export default function CategoryRow({ title, severities, types }) {
  return (<Row>
    <Col xs {...classes('title')}>{capitalize(title)}</Col>
    <Col xs {...classes('severity')}>
      <Field name={`${title}_severity`} component="select" parse={value => value !== undefined ? parseInt(value) : value}>
        {severities.map(([label, severity]) => (<option
          key={severity}
          value={severity}
        >
          {label}
        </option>))}
      </Field>
    </Col>
    {types.map(([label, type]) => (<Col xs key={type} {...classes('type')}>
      <Field key={`${title}_${type}`} name={`${title}_${type}`} component={ValueCheckbox} />
    </Col>))}
  </Row>)
}

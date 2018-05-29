import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import { Field } from 'redux-form/immutable'
import { capitalize } from 'lodash'

import { classes } from '../NotificationSettings'

import ValueCheckbox from './ValueCheckbox'

// Redux form field converts the value to a string but we want it to be stored as a number
const parseAsInt = value => (value !== undefined ? parseInt(value, 10) : value)

export default function CategoryRow({ title, severities, types }) {
  return (<Row>
    <Col xs {...classes('title')}>{capitalize(title)}</Col>
    <Col xs {...classes('severity')}>
      <Field name={`${title}_severity`} component="select" parse={parseAsInt}>
        {severities.map(([label, severity]) => (<option
          key={severity}
          value={severity}
        >
          {label}
        </option>))}
      </Field>
    </Col>
    {types.map(([, type]) => (<Col xs key={type} {...classes('type')}>
      <Field key={`${title}_${type}`} name={`${title}_${type}`} component={ValueCheckbox} />
    </Col>))}
  </Row>)
}

CategoryRow.propTypes = {
  title: PropTypes.string.isRequired,
  severities: PropTypes.arrayOf(PropTypes.array).isRequired,
  types: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

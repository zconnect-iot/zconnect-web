import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

import { SelectField, CheckboxField } from '../../../widgets/forms'


export default function CategoryRow({ title, severities, types }) {
  return (<Row>
    <Col>{title}</Col>
    <Col>
      <SelectField name={`${title}_severity`}>
        {severities.map(([label, severity]) => (<option
          key={severity}
          value={severity}
        >
          {label}
        </option>))}
      </SelectField>
    </Col>
    {types.map(([label, type]) => (<Col key={type}>
      <CheckboxField name={`${title}_${type}`} />
    </Col>))}
  </Row>)
}

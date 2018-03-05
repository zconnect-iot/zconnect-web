import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import { Field } from 'redux-form/immutable'

import { Button, Spinner } from 'zc-web/components'

import styles from './style.scss'


class CheckboxGroup extends React.Component {
  checkboxGroup() {
    const { label, required, options, input, meta, rowRef, initialState } = this.props

    return options.map((option) => {
      const checkbox = `${rowRef}.${option.ref}`
      // Before any checkbox clicked set initial state to represent the device.state in the DB
      if (input.value === '') input.onChange(initialState)

      return (
        <Row xs={3} key={option.id}>
          <input type="checkbox"
            name={checkbox}
            value={checkbox}
            checked={input.value.indexOf(checkbox) !== -1}
            onChange={(event) => {
              const newValue = [...input.value]
              if (event.target.checked) newValue.push(checkbox)
              else newValue.splice(newValue.indexOf(checkbox), 1)
              return input.onChange(newValue)
            }}
          />
        </Row>)
    })
  }

  render() {
    const { title } = this.props
    return (
      <Col xs className={styles.centre}>
        <Row>{title}</Row>
        {this.checkboxGroup()}
      </Col>
    )
  }
}

const RowTitles = ({ options }) => (
  <Col xs={2} className={styles.centre}>
    <Row />
    {options.map(option =>
      <Row key={option.id} className={styles.rowTitles}>{option.name}</Row>)
    }
  </Col>
)

const alertTypes = [
  { id: 1, name: 'Emergency shut', ref: 'state.alerts.emergency_close' },
  { id: 2, name: 'Low battery', ref: 'state.alerts.low_battery' },
  { id: 3, name: 'Not opened', ref: 'state.alerts.not_opened' },
]
const notificationOptions = [
  { id: 1, name: 'Email Owner', ref: 'email.owner' },
  { id: 2, name: 'SMS Owner', ref: 'sms.owner' },
  { id: 3, name: 'Email Admin', ref: 'email.admin' },
  { id: 4, name: 'SMS Admin', ref: 'sms.admin' },
]

export default function CheckboxForm({ handleSubmit, initialState, showSpinner }) {
  return (
    <form className={styles.CheckboxForm}>
      { showSpinner ?
        <Spinner /> :
        <div>
          <div className={styles.grid}>
            <RowTitles options={notificationOptions} />
            {alertTypes.map(alertType =>
              (<Field
                key={alertType.id}
                title={alertType.name}
                rowRef={alertType.ref}
                name="alerts"
                component={CheckboxGroup}
                options={notificationOptions}
                initialState={initialState}
              />),
            )}
          </div>
          <Button action={handleSubmit} color="success">Submit</Button>
        </div>
      }
    </form>
  )
}

CheckboxForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.arrayOf(PropTypes.string).isRequired,
  showSpinner: PropTypes.bool.isRequired,
}

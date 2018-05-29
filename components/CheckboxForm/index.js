import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import { Field } from 'redux-form/immutable'

import { Button, Spinner } from '../../components'
import CheckboxGroup from './CheckboxGroup'

import styles from './style.scss'


const RowTitles = ({ options }) => (
  <Col xs={3} className={styles.centre}>
    <Row />
    {options.map(option =>
      <Row key={option.id} className={styles.rowTitles}>{option.name}</Row>)
    }
  </Col>
)

RowTitles.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

export default function CheckboxForm(props) {
  const {
    handleSubmit, initialState, showSpinner, questions, options,
  } = props
  return (
    <form className={styles.CheckboxForm}>
      { showSpinner ?
        <Spinner /> :
        <div>
          <div className={styles.grid}>
            <RowTitles options={options} />
            {questions.map(question =>
              (<Field
                key={question.id}
                title={question.name}
                rowRef={question.ref}
                name="alerts"
                component={CheckboxGroup}
                options={options}
                initialState={initialState}
              />))}
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
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ref: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

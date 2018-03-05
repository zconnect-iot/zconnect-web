import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'

import CheckboxItem from './CheckboxItem'

import styles from './style.scss'


export default class CheckboxGroup extends React.Component {
  componentDidMount() {
    const { input, initialState } = this.props
    // Before any checkbox clicked set initial state to represent the device.state in the DB
    if (input.value === '') input.onChange(initialState)
  }

  checkboxGroup() {
    const { options, input, rowRef } = this.props

    return options.map((option) => {
      const checkbox = `${rowRef}.${option.ref}`
      return (
        <Row xs={3} key={option.id}>
          <CheckboxItem
            checkbox={checkbox}
            input={input}
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

CheckboxGroup.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ref: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  rowRef: PropTypes.string.isRequired,
  initialState: PropTypes.arrayOf(PropTypes.string).isRequired,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
}

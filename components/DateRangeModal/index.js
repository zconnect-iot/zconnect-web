import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Button, DateRangePicker } from '../'
import { ModalContainer } from '../../views'

import './style.scss'


const classes = BEMHelper('DateRangeModal')

export default class DateRangeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: props.start,
      end: props.end,
    }
  }

  onDatePicker = ({ start, end }) => {
    this.setState({
      start,
      end,
    })
  }

  onClose = () => {
    this.setState({
      start: this.props.start,
      end: this.props.end,
    })
    this.props.closeModal()
  }

  isDirty = () => this.props.end !== this.state.end ||
    this.props.start !== this.state.start

  submitForm = () => {
    const { start, end } = this.state
    if (this.props.end !== end || this.props.start !== start) this.props.onChangeDates({
      start,
      end,
    })
    this.props.closeModal()
  }

  render() {
    const { start, end } = this.state
    const { visible, className } = this.props
    return (
      <ModalContainer
        {...classes(null, null, className)}
        title="Set date range"
        visible={visible}
        onClose={this.onClose}
      >
        <DateRangePicker
          start={start}
          end={end}
          onChange={this.onDatePicker}
        />
        {this.isDirty() && <div {...classes('footer')}>
          <Button action={this.submitForm} color="success">Save</Button>
        </div>}
      </ModalContainer>
    )
  }
}

DateRangeModal.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onChangeDates: PropTypes.func.isRequired,
  className: PropTypes.string,
}

DateRangeModal.defaultProps = {
  className: '',
  start: '',
  end: '',
}

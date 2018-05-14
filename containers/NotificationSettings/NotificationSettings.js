import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-flexbox-grid'
import BEMHelper from 'react-bem-helper'
import { noop } from 'lodash'

import { zcApiShapeJS } from 'zc-core/utils/propTypes'

import { Button, Spinner } from '../../components'

import CategoryRow from './components/CategoryRow'

import './style.scss'


export const classes = BEMHelper({ name: 'SubsSettings' })

export default class NotificationSettings extends React.Component {
  componentDidMount() {
    this.props.getRef(this)
    this.props.fetchSubs()
  }
  componentWillReceiveProps(props) {
    if (props.isDirty !== this.props.isDirty) props.onChange()
  }
  render() {
    const { categories, severities, types, isDirty, submitForm, api, errorMessage, hideSave } = this.props
    if (api.pending) return <Spinner />
    if (api.error) return <h4 className="text-danger">{errorMessage}</h4>
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
        {isDirty && !hideSave && <Button
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

NotificationSettings.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  severities: PropTypes.arrayOf(PropTypes.array).isRequired,
  types: PropTypes.arrayOf(PropTypes.array).isRequired,
  isDirty: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  api: zcApiShapeJS.isRequired,
  errorMessage: PropTypes.string.isRequired,
  fetchSubs: PropTypes.func.isRequired,
  hideSave: PropTypes.bool,
  getRef: PropTypes.func,
  onChange: PropTypes.func,
}

NotificationSettings.defaultProps = {
  getRef: noop,
  onChange: noop,
  hideSave: false,
}

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

export default class NotificationSettingsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
    }
  }
  componentDidMount() {
    this.props.getRef(this)
    this.props.fetchSubs()
  }
  componentWillReceiveProps(props) {
    if (props.isDirty !== this.props.isDirty) props.onChange()
    // Reset submitted state when form dirtied after successful submission
    if (this.state.submitted && this.props.batchApi.success && !this.props.isDirty &&
      props.isDirty) this.setState({ submitted: false })
  }
  submitForm = () => {
    this.props.submitForm()
    this.setState({ submitted: true })
  }
  render() {
    const { categories, severities, types, isDirty, api, batchApi, errorMessage, hideSave } = this.props
    const { submitted } = this.state
    if (api.pending || batchApi.pending) return <Spinner />
    if (!isDirty && api.error) return <h4 className="text-danger">{errorMessage}</h4>
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
          action={this.submitForm}
        >
          Save
        </Button>}
        {batchApi.error && <h4 className="text-danger margin-top">{errorMessage}</h4>}
        {submitted && batchApi.success && <h4 className="text-success margin-top">Notification settings updated</h4>}
      </div>
    )
  }
}

NotificationSettingsComponent.propTypes = {
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
  batchApi: zcApiShapeJS.isRequired,
}

NotificationSettingsComponent.defaultProps = {
  getRef: noop,
  onChange: noop,
  hideSave: false,
}

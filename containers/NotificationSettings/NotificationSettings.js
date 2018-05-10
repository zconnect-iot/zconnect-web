import React from 'react'
import { reduxForm } from 'redux-form'

import CategoryRow from './components/CategoryRow'

class NotificationSettings extends React.Component {
  componentDidMount() {
    this.props.fetchSubs()
  }
  render() {
    console.log(this.props);
    const { categories, severities, types } = this.props
    return (
      <div>
        {categories.map(category => (<CategoryRow
          key={category}
          title={category}
          severities={severities}
          types={types}
        />))}
      </div>
    )
  }
}

export default reduxForm({
  form: 'subscriptions',
  enableReinitialize: true,
})(NotificationSettings)

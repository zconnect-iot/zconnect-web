import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import classnames from 'classnames'

// import { TextField, PasswordField } from 'widgets/Form'

function TextField(props) {
  const { label, meta, input, className, ...otherProps } = props
  const { dirty, error, asyncValidating } = meta
  return (
    <div className="TextField">
      <div className="TextField--label">
        {label}
      </div>
      <input
        id={label}
        className={classnames('TextField--input', className)}
        type="text"
        {...input}
        {...otherProps}
      />
      { !asyncValidating && dirty && error && <div className="TextField--validation">{error}</div> }
    </div>
  )
}


const LoginForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form>
      <Field autoFocus label="Username" name="email" component={TextField} />
      <Field label="Password" name="password" component={TextField} />
      <button type="submit" onClick={handleSubmit} disabled={pristine || submitting}>LOG IN</button>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)

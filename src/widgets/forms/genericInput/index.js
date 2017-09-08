import React from 'react'
import styles from './style.scss'

const genericWarning = message => <span className={styles.warning}>
  {message}
</span>

const genericError = message => <span className={styles.error}>
  {message}
</span>

const genericInput = (
  classes,
  props,
  renderError = genericError,
  renderWarning = genericWarning
) => {
  const meta = props.meta
  return <div {...classes()}>
    <label
      htmlFor={props.name}
      {...classes('label')}
    >
      {props.label}
    </label>

    <input
      type={props.type}
      placeholder={props.label}
      {...classes('input')}
      {...props.input}
    />

    {meta.touched && (
      (error && renderError(meta.error)) ||
      (warning && renderWarning(meta.warning))
    )}
  </div>
}

export {
  genericWarning,
  genericError,
  genericInput as default,
}

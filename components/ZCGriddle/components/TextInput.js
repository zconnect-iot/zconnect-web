import React from 'react'
import classnames from 'classnames'

import { Icon } from '../../../components'


export default function TextInput({ icon, className, children, ...props }) {
  return (
    <div className={classnames(['TextInput', className])}>
      {icon && <Icon className="TextInput__Icon" size={24} name={icon} />}
      <input type="text" {...props} />
      {children}
    </div>
  )
}

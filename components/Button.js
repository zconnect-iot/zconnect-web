import React from 'react'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Button' })

export default function Button({ color, hollow, children, className }) {
  return (
    <button {...classes(null, [color || null, hollow ? 'hollow' : null], className)}>
      {children}
    </button>
  )
}

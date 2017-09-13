import React from 'react'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Logo' })

export default function Logo({ small }) {
  return (
    <div {...classes(null, small ? 'small' : null)} />
  )
}

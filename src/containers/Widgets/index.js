import React from 'react'

import { Content } from 'components'
import addSVG from 'icons/Dark Grey/add.svg'
import printSVG from 'icons/Dark Grey/print.svg'

import { Buildings } from '../../containers/demo/index'


export default function () {
  return (
    <Content
      title="Widgets"
      actionItems={[
        { title: 'Add building', icon: addSVG, action: () => {} },
        { title: 'Print report', icon: printSVG, action: () => {} },
      ]}
    >
      <Buildings />
    </Content>
  )
}

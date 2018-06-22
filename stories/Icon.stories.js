import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, number } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'

import { Icon } from '../components'

storiesOf('Icon', module)
  .add(
    'spanner',
    withNotes(
      "The available Icon names are taken from the list of SVG's in /assets/icons",
    )(() => (<Icon
      onClick={action('onClick')}
      name={text('name', 'SPANNER')}
    />)),
  )
  .add('brand success', () => (<Icon
    name={text('name', 'SPANNER')}
    color={text('color', 'success')}
  />))
  .add('size', () => (<Icon
    name={text('name', 'SPANNER')}
    color={text('color', 'success')}
    size={number('size', 24)}
  />))

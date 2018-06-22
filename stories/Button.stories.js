import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'

import { Button } from '../components'

storiesOf('Button', module)
  .add('with text', () => <Button action={action('clicked')}>{text('Label', 'Hello')}</Button>)
  .add('in cornflour blue', () => <Button action={action('clicked')} color="primary">Blue</Button>)
  .add(
    'using Page navigation',
    withNotes(
      'If passed route prop the navigate function provided by the parent Page component is used instead',
    )(() => <Button route="/hello">Hello</Button>),
  )

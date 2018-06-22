import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'

import { DateRangeModal } from '../components'

storiesOf('DateRangeModal', module)
  .add('with null dates', () => (<DateRangeModal
    onChangeDates={action('datesChanged')}
    start={null}
    end={null}
    visible
    closeModal={action('closeModal')}
  />))
  .add('with start and end props', () => (<DateRangeModal
    onChangeDates={action('datesChanged')}
    start="2018-06-12T22:59:59.999Z"
    end="2018-06-18T23:00:00.000Z"
    visible
    closeModal={action('closeModal')}
  />))
  .add('with knobs', () => (<DateRangeModal
    onChangeDates={action('datesChanged')}
    start={text('start', '')}
    end={text('end', '')}
    visible={boolean('visible', true)}
    closeModal={action('closeModal')}
    className={text('className', '')}
  />))

import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { withKnobs } from '@storybook/addon-knobs'

import { Page } from '../components'


// addDecorator(withNotes)
addDecorator(withKnobs)

// Adding Page here as it provides navigation props to some components via context
// Over ride NavBar as default depends on react-redux connect
addDecorator((story) => (
  <Page NavBar={() => null} navigate={action('navigate')} location={{ pathname: '/' }}>
    {story()}
  </Page>
))

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

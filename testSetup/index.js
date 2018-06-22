import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow, render, mount } from 'enzyme'

import { mockState } from './store'

Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow
global.render = render
global.mount = mount
global.mockState = mockState

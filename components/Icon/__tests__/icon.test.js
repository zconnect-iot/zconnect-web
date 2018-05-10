import React from 'react'
import Icon from '../'

describe.skip('<Icon/>', () => {
  test('should render an Icon', () => {
    const wrapper = shallow(<Icon name="SHOPPING_CART" />)
    expect(wrapper).toMatchSnapshot()
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title', () => {
    const sBlog = {
      title: 'Testititle',
      author: 'Testikirjoittaja',
      likes: 5
    }

    const sBlogComponent = shallow(<SimpleBlog blog={sBlog} />)
    const titleauthorDiv = sBlogComponent.find('.titleauthor')

    expect(titleauthorDiv.text()).toContain(sBlog.title)
    expect(titleauthorDiv.text()).toContain(sBlog.author)

    const likesDiv = sBlogComponent.find('.likes')
    expect(likesDiv.text()).toContain(`blog has ${sBlog.likes}`)
  })

  it('clicking twice the like-button calls event handler twice', () => {
    const sBlog = {
      title: 'Testititle',
      author: 'Testikirjoittaja',
      likes: 5
    }
  
    const mockHandler = jest.fn()
  
    const sBlogComponent = shallow(
      <SimpleBlog 
        blog={sBlog}
        onClick={mockHandler}
      />
    )
  
    const button = sBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import Togglable from './Togglable'

describe.only('<Togglable />', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = shallow(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  const sBlog = {
    title: 'Testititle',
    author: 'Testikirjoittaja',
    url: 'http://www.yle.fi',
    likes: 5,
  }
  const sBlogUserName = 'TS'
  const buttonString = `${sBlog.title} ${sBlog.author}`

  it('at start the detailed info is not displayed but title and author are shown', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })

    const toggComponent = shallow(<Togglable buttonLabel={buttonString}/>)
    const buttonComponent = toggComponent.find('button')
    
    expect(buttonComponent.at(0).text()).toContain(sBlog.title)
    expect(buttonComponent.at(0).text()).toContain(sBlog.author)
    expect(buttonComponent.at(0).text()).not.toContain(sBlog.url)
    

  })

  it('after clicking the button, detailed info is shown', () => {
    const toggComponent = shallow(
      <Togglable buttonLabel={buttonString}>
        <div>
        <p>{sBlog.title} {sBlog.author}</p>
        <p>{sBlog.url}</p>
        <p>{sBlog.likes} <button>Like</button></p>
        <p>added by {sBlogUserName}</p>
        <button>delete</button>
      </div>
      </Togglable>
    )
    const div2 = toggComponent.find('.togglableContent')
    expect(div2.getElement().props.style).toEqual({ display: 'none' })
    const button = toggComponent.find('button')

    button.at(0).simulate('click')
    const div3  = toggComponent.find('.togglableContent')
    expect(div3.getElement().props.style).toEqual({ display: '' })

  })

})
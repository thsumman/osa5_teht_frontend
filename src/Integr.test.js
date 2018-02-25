import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  let loggedUserJSON

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
      loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      app = mount(
        <App />
      )
    })

    it('only login form is rendered', () => {
      app.update()
      expect(loggedUserJSON).toEqual(undefined)
      if (loggedUserJSON == undefined) {
        const inputs = app.find('input')
        expect(inputs.at(0).getElement().props.name).toEqual('username')
        const h2s = app.find('h2')
        h2s.forEach(h2 => expect(h2).not.toContain("blogs"))
      }
    })
  })

  describe('when user is logged', () => {
    beforeAll(() => {
      // luo sovellus siten, että käyttäjä on kirjautuneena
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      let loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      expect(loggedUserJSON).toContain('tester')
      expect(loggedUserJSON).toContain('Teuvo Testaaja')
      expect(loggedUserJSON).toContain('1231231214')
      app = mount(
        <App />
      )
      app.state().user = user
    })

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})

import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: {
        title: '',
        author: '',
        url: '',
        likes: ''
      },
      username: '',
      password: '',
      user: null,
      notification: {
        message: '',
        type: ''
      }
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => 
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    } 
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlog.title,
      author: this.state.newBlog.author,
      url: this.state.newBlog.url,
      likes: this.state.newBlog.likes
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          notification: {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            type: 'notification'
          },
          newBlog: {
            title: '',
            author: '',
            url: '',
            likes: ''
          }
        })
      })
      setTimeout(() => {
        const notiHelpVar = {
          message: '', 
          type: ''
        }
        this.setState({ notification: notiHelpVar })
      }, 5000)
      
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        notification: {
          message: 'wrong username or password',
          type: 'error'
        }
      })
      setTimeout(() => {
        const notiHelpVar = {
          message: '', 
          type: ''
        }
        this.setState({ notification: notiHelpVar })
      }, 5000)
    }
  }

  logout = async (e) => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({user: null})
  }

  handleBlogChange = (event) => {
    const stateHelpVar = this.state.newBlog
    stateHelpVar[event.target.name] = event.target.value
    this.setState({ newBlog: stateHelpVar })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  likeBlog = (event) => {
    const blog = JSON.parse(event.target.value)
    const newBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1
    }
    blogService
      .update(blog._id, newBlog)
      .then(changedBlog => {
        this.setState({
          blogs: this.state.blogs.map(blog2 => blog2._id !== blog._id ? blog2 : changedBlog),
          notification: {
            message: `a new like to ${newBlog.url} is saved`,
            type: 'notification'
          }
        })
      })
      setTimeout(() => {
        const notiHelpVar = {
          message: '', 
          type: ''
        }
        this.setState({ notification: notiHelpVar })
      }, 5000)
  }

  sortBlogsByLikes = (aBlog, bBlog) => {
    
    if (aBlog.likes < bBlog.likes) {
      return 1;
    }
    if (aBlog.likes > bBlog.likes) {
      return -1;
    }
    return 0;
  }

  deleteBlogById = (event) => {
    const blog = JSON.parse(event.target.value)
    const ifYesDelete = window.confirm(`delete '${blog.title}' by ${blog.author}`)
    if (ifYesDelete) {
      const blog = JSON.parse(event.target.value)
      blogService
        .deleteB(blog._id)
        .then(changedBlog => {
          this.setState({
            blogs: this.state.blogs.filter(blog2 => blog2._id !== blog._id),
            notification: {
              message: `a blog info ${blog.title} was removed`,
              type: 'notification'
            }
          })
        })
        setTimeout(() => {
          const notiHelpVar = {
            message: '', 
            type: ''
          }
          this.setState({ notification: notiHelpVar })
        }, 5000)
      }
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
    
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
    const blogForm = () => (
      <Togglable buttonLabel="new note">
        <BlogForm
          onSubmit={this.addBlog}
          value={this.state.newBlog}
          handleBlogChange={this.handleBlogChange}
        />
      </Togglable>
    )
    
    const blogList = () => {
      const sortedBlogs = this.state.blogs.sort(this.sortBlogsByLikes)
      return (
        <div>
          <h2>blogs</h2>
            {sortedBlogs.map(blog => 
              <Blog 
                key={blog._id} 
                blog={blog} 
                blogUserName={blog.user.name}
                likeBlog={this.likeBlog}
                deleteBlog={this.deleteBlogById}
                userName={this.state.user.name}
              />
            )}
        </div>
      )
    }
    return (
      <div>
        <Notification message={this.state.notification.message} type={this.state.notification.type} />
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
            {blogForm()}
            {blogList()}
          </div>}
        
      </div>
    );
  }
}

export default App;

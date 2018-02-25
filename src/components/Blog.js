import React from 'react'
import Togglable from './Togglable'



const Blog = ({blog, blogUserName, likeBlog, deleteBlog, userName}) =>  {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogString = JSON.stringify(blog)
  let showDeleteOrNot = { display : 'none' }
  if ((blogUserName === userName) || (blogUserName === undefined)
      || (blogUserName === '') || (blogUserName === null)) {
    showDeleteOrNot = { display : '' }
  }
  const buttonString = `${blog.title}, ${blog.author}`
  return (
    <Togglable buttonLabel={buttonString}>
      <div style={blogStyle}>
        <p>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button value={blogString} onClick={likeBlog} >Like</button></p>
        <p>added by {blogUserName}</p>
        <button style={showDeleteOrNot} value={blogString} onClick={deleteBlog}>delete</button>
      </div>
    </Togglable>
  )
}

export default Blog
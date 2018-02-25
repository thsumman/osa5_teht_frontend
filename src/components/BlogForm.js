import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleBlogChange, value}) => {
  return (
    <div>
      <h2>Luo uusi blogitieto</h2>

      <form onSubmit={onSubmit}>
        <p>Title</p>
        <input
          name="title"
          value={value.title}
          onChange={handleBlogChange}
        />
        <p>Author</p>
        <input
          name="author"
          value={value.author}
          onChange={handleBlogChange}
        />
        <p>Url</p>
        <input
          name="url"
          value={value.url}
          onChange={handleBlogChange}
        />
        <p>Likes</p>
        <input
          name="likes"
          value={value.likes}
          onChange={handleBlogChange}
        />
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleBlogChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
}

export default BlogForm
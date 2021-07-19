import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = ( { blogs, handleLike } ) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)

    if (!blog) {
        return null
    }

    return (
        <div>
            <h2><i>{blog.title}</i> | {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} {blog.likes > 1 ? 'likes' : 'like'}<button onClick={() => handleLike(id)}>like</button><br/>
            added by {blog.user.name}
        </div>
    )
}

export default SingleBlog
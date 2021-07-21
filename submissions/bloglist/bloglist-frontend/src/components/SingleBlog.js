import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { addCommentActionCreator } from '../reducers/blogReducer'

const SingleBlog = ( { blogs, handleLike } ) => {
    const [ comment, setComment ] = useState('')
    const id = useParams().id
    const dispatch = useDispatch()
    const blog = blogs.find(b => b.id === id)

    if (!blog) {
        return null
    }

    const handleSubmit = async event => {
        event.preventDefault()
        blogService.addCommentService(id, comment)
        const commentedBlogObject = {
            ...blog,
            comments: [...blog.comments, comment]

        }
        dispatch( addCommentActionCreator(commentedBlogObject) )

    }

    return (
        <div>
            <h2><i>{blog.title}</i> | { blog.author }</h2>
            <a href={blog.url}>{blog.url}</a><br/>
            {blog.likes} {blog.likes > 1 ? 'likes' : 'like'}<button onClick={() => handleLike(id)}>like</button><br/>
            added by {blog.user.name}<br/>
            <h3>comments</h3>

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={ comment }
                    onChange={( { target } ) => setComment( target.value )}
                />
                <button type='submit'>add comment</button>

            </form>

            <ul>
                { blog.comments.map(c =>
                    <li key={ blog.comments.indexOf(c) }>
                        { c }
                    </li>
                )}
            </ul>

        </div>
    )
}

export default SingleBlog
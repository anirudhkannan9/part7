//import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE_BLOG': {
            let id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }
            console.log('in blogReducer/LIKE_BLOG, likedBlog after calling service and after incrementing vote: ', likedBlog)

            return state.slice().map(b => b.id !== id ? b : likedBlog)
        }
        case 'REMOVE_BLOG':
            return state.slice().filter(b => b.id !== action.data.id)
        default: return state
    }
}

//action creators
export const initializeBlogsActionCreator = ( blogs ) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const createNewBlogActionCreator = ( data ) => {
    return {
        type: 'NEW_BLOG',
        data
    }
}

export const likeBlogActionCreator = blog => {
    return {
        type: 'LIKE_BLOG',
        data: blog
    }
}

export const removeBlogActionCreator = blog => {
    return {
        type: 'REMOVE_BLOG',
        data: blog
    }
}

export default blogReducer
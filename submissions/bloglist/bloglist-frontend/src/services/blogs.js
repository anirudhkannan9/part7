import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return request.then(response => response.data)
}

const voteForBlogService = blog => {
  const votedBlog = { ...blog, likes: blog.likes + 1 }
  console.log('in voteForBlogService, votedBlog: ', votedBlog)
  console.log('in voteForBlogService, blog ID: ', blog.id)
  console.log('in voteForBlogService, getConfig(): ', getConfig())
  const request = axios
    .put(`${baseUrl}/${blog.id}`, votedBlog, getConfig())
    .then(response => {
      console.log(response.data)
    })
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  voteForBlogService,
  remove,
}
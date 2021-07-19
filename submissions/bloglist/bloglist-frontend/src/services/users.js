import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsersService = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {
    getAllUsersService
}
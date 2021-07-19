import React from 'react'
//import userService from '../services/users'
import './Users.css'

const Users = ( { users } ) => {
    console.log(users)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users
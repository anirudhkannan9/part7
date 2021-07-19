import React from 'react'
import { useParams } from 'react-router-dom'

const User = ( { users } ) => {
    const id = useParams().id
    //console.log(users)
    //console.log(id)
    const user = users.find(u => u.id === id)
    console.log(user.blogs)

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added blogs: </h3>
            <ul>
                {user.blogs.map(b =>
                    <li key={b.id}>
                        {b.title}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default User
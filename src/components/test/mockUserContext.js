import React, { useState } from 'react'
import UserContext from '../../Context'

const MockUserContext = ({ initialUser, children }) => {
    const [user, setUser] = useState(initialUser)

    return (
        <UserContext.Provider value={{ user, setNewUser: setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default MockUserContext
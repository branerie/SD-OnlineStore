import React from 'react'

const UserContext = React.createContext({
    user: {
        userId: null,
        isAdmin: false
    },
    setUser: () => {}
})

export default UserContext
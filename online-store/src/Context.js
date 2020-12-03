import React from 'react'

const UserContext = React.createContext({
    user: {
        userId: null,
        isAdmin: false,
        favorites: []
    },
    setUser: () => {}
})

export default UserContext
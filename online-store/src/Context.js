import React from 'react'

const UserContext = React.createContext({
    userId: null,
    isAdmin: false
})

export default UserContext
import React from 'react'

const UserContext = React.createContext({
    user: {},
    setNewUser: () => {},
    editShoppingCart: () => {},
    getFullCartProducts: () => {}, 
    getFullFavoriteProducts: () => {} 
})

export default UserContext
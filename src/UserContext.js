import React from 'react'

const UserContext = React.createContext({
    user: {},
    setNewUser: () => {},
    editShoppingCart: () => {},
    getFullCartProducts: () => {}, 
    getFullHistoryProducts: () => {}, 
    getFullFavoriteProducts: () => {} 
})

export default UserContext
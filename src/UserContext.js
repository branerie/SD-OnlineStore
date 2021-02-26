import React from 'react'

const UserContext = React.createContext({
    user: {
        userId: null,
        isAdmin: false,
        favorites: [],
        cart: []
    },
    setNewUser: () => {},
    editShoppingCart: () => {},
    getFullCartProducts: () => {}, 
    getFullHistoryProducts: () => {}, 
    getFullFavoriteProducts: () => {} 
})

export default UserContext
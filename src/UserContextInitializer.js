import React, { useCallback, useEffect, useState } from 'react'
import UserContext from './UserContext'
import { useAsyncError } from './hooks'
import { changeShoppingCart, verifyUser } from './services/user'
import { CART_COOKIE_NAME } from './utils/constants'
import { getCookie, setCookie } from './utils/cookie'

const GUEST_USER = { userId: null, isAdmin: false, favorites: [], cart: [] }

const UserContextInitializer = ({ children }) => {
    const [user, setUser] = useState(null)
    const throwInternalError = useAsyncError()

    const verifyCurrentUser = useCallback(async () => {
        try {
            const userInfo = await verifyUser()

            if (!userInfo.userId) {
                const savedCartString = getCookie(CART_COOKIE_NAME)
                if (savedCartString) {
                    userInfo.cart = JSON.parse(savedCartString)
                } else {
                    userInfo.cart = []
                }
            }

            setUser(userInfo)
        } catch(error) {
            setUser(GUEST_USER)
        }
	}, [])

    useEffect(() => {
        verifyCurrentUser()
    }, [])

    const editShoppingCart = useCallback(async (productId, sizeName, quantityChange) => {
        try {
            if (quantityChange === 0) {
                return
            }
    
            let cart = [...user.cart]
    
            const itemInCart = cart.find(i =>
                i.productId === productId && i.sizeName === sizeName)
    
            let newQuantity = quantityChange
            if (itemInCart) {
                newQuantity += itemInCart.quantity
    
                if (newQuantity > 0) {
                    itemInCart.quantity = newQuantity
                } else {
                    cart = cart.filter(i => i.productId !== productId || i.sizeName !== sizeName)
                }
            } else if (quantityChange > 0) {
                cart.push({ productId, sizeName, quantity: newQuantity })
            } else {
                return
            }
    
            setUser({ ...user, cart })
            newQuantity = Math.max(0, newQuantity)
    
            if (user.userId) {
                const result = await changeShoppingCart(user.userId, productId, sizeName, newQuantity)
    
                if (result.error) {
                    // TODO: log errors?
                    /* 
                    if (result.status) {
                        throwInternalError(new InternalError(result.status, result.error))
                    }
                    */
    
                    throwInternalError()
                }
            } else {
                setCookie(CART_COOKIE_NAME, JSON.stringify(cart), '10d')
            }
        } catch(error) {
            throwInternalError()
        }
    }, [user])

    const setNewUser = (userProps = {}) => {
        setUser({ ...GUEST_USER, ...userProps })
    }

    if (!user) {
        return null
    }

    return (
        <UserContext.Provider value={{ user, setNewUser, editShoppingCart }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextInitializer
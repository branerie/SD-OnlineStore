import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from './UserContext'
import ErrorContext from './ErrorContext'
import { useAsyncError } from './hooks'
import { 
    changeShoppingCart, 
    makePurchase, 
    setFavorites,
    setShoppingCart, 
    verifyUser, 
} from './services/user'
import { CART_COOKIE_NAME } from './utils/constants'
import { getCookie, setCookie } from './utils/cookie'
import { getProductDetailsMain } from './services/product'

const GUEST_USER = {
    userId: null,
    email: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    favorites: [],
    ratedProducts: [],
    cart: []
}

const UserContextInitializer = ({ children }) => {
    const [user, setUser] = useState(null)
    const throwInternalError = useAsyncError()
    const { addMessage } = useContext(ErrorContext)

    const setNewUser = useCallback((userProps = {}) => setUser({ ...GUEST_USER, ...userProps }), [])

    const verifyCurrentUser = useCallback(async () => {
        try {
            const userInfo = await verifyUser()

            if (!userInfo.userId) {
                const savedCartString = getCookie(CART_COOKIE_NAME)
                userInfo.cart = savedCartString ? JSON.parse(savedCartString) : []
            }

            setNewUser(userInfo)
        } catch (error) {
            setNewUser()
        }
    }, [setNewUser])

    useEffect(() => {
        verifyCurrentUser()
    }, [verifyCurrentUser])

    const handlePurchase = useCallback(async () => {
        const result = await makePurchase()
        if (result.error) {
            if (result.errorType === 'quantities') {
                return result.unavailablePurchases
            }

            return addMessage(
                'Cart Purchase',
                result.displayError ||
                'An error occurred while trying to process your request. Please be patient as we try to solve this issue.'
            )
        }

        setNewUser({
            ...user,
            cart: []
        })
    }, [user, setNewUser, addMessage])

    const getProductSizeTotalQuantity = useCallback(async (productId, sizeName) => {
        const currentProductInfo = await getProductDetailsMain([productId])

        const currentProductSize = currentProductInfo[productId].sizes.find(s => s.sizeName === sizeName)
        return currentProductSize.count
    }, [])

    const editShoppingCart = useCallback(async (productId, sizeName, quantityChange) => {
        try {
            if (quantityChange === 0) {
                return
            }

            let cart = [...user.cart]

            const itemInCart = cart.find(i => i.productId === productId && i.sizeName === sizeName)
            if (!itemInCart && quantityChange < 0) {
                return
            }

            const cartItemTotalQuantity = await getProductSizeTotalQuantity(productId, sizeName)

            let newQuantity = quantityChange
            if (itemInCart) { // items exists in cart, we are adjusting the quantity
                newQuantity = Math.min(itemInCart.quantity + newQuantity, cartItemTotalQuantity)

                if (newQuantity > 0) {

                    if (newQuantity > cartItemTotalQuantity) {
                        return
                    }

                    itemInCart.quantity = newQuantity
                } else {
                    cart = cart.filter(i => i.productId !== productId || i.sizeName !== sizeName)
                }
            } else if (quantityChange > 0) { // item is not in cart, we are trying to add it there
                newQuantity = Math.min(newQuantity, cartItemTotalQuantity)
                cart.push({ productId, sizeName, quantity: newQuantity })
            }

            newQuantity = Math.max(0, newQuantity)

            if (user.userId) {
                const result = await changeShoppingCart(productId, sizeName, newQuantity)

                if (result.error) {
                    // TODO: Could possibly log errors in future
                    /* 
                    if (result.status) {
                        throwInternalError(new InternalError(result.status, result.error))
                    }
                    */

                    return addMessage(
                        'Change Shopping Cart',
                        'An error occurred while trying to update your shopping cart. Please be patient as we try to solve the issue.'
                    )
                }

                setUser({ ...user, cart })
                return
            }

            setCookie(CART_COOKIE_NAME, JSON.stringify(cart), '10d')
            setUser({ ...user, cart })
        } catch (error) {
            throwInternalError()
        }
    }, [user, getProductSizeTotalQuantity, throwInternalError, addMessage])

    const getFullCollectionProducts = useCallback(async (productIds) => {
        const requestResult = await getProductDetailsMain(productIds)
        if (requestResult.error) {
            throw new Error('Could not retrieve products info')
        }

        return requestResult
    }, [])

    const getFullCartProducts = useCallback(async () => {
        const cartProductIds = Array.from(new Set(user.cart.map(p => p.productId)))
        if (cartProductIds.length === 0) {
            return []
        }

        const cartProductsInfo = await getFullCollectionProducts(cartProductIds)

        const userCart = [...user.cart]
        let isModified = false
        for (let cartIndex = 0; cartIndex < userCart.length; cartIndex++) {
            const { productId, sizeName } = userCart[cartIndex]
            const productInfo = cartProductsInfo[productId] 
            const sizeInfo = productInfo && productInfo.sizes.find(s => s.sizeName === sizeName)

            // in case a product was removed by an admin or size is currently out of stock
            if (!productInfo || (sizeInfo && sizeInfo.count === 0)) {
                userCart.splice(cartIndex, 1)
                cartIndex--
                isModified = true
                continue
            }
        }

        if (isModified) {
            const updateResult = await setShoppingCart(userCart)
            if (updateResult.error) {
                addMessage(
                    'Shopping Cart Update',
                    'A problem occurred when trying to retrieve your shopping cart. We apologize for the inconvenience'
                )

                return []
            }

            setNewUser({ ...user, cart: userCart })
        }

        const newProductsInCart = userCart.map(p => { 
            return { sizeName: p.sizeName, quantity: p.quantity, ...cartProductsInfo[p.productId] } 
        })

        return newProductsInCart
    }, [user, getFullCollectionProducts, addMessage, setNewUser])

    const getFullFavoriteProducts = useCallback(async () => {
        if (user.favorites.length === 0) {
            return []
        }

        const favoriteProducts = await getFullCollectionProducts(user.favorites)

        if (Object.keys(favoriteProducts).length === user.favorites.length) {
            return favoriteProducts
        }

        // a product which is in user's favorites was removed by an admin
        const removedProductIds = user.favorites.filter(productId => !favoriteProducts[productId])
        for (const removedProductId of removedProductIds) {
            const removeResult = await setFavorites(removedProductId)
            if (removeResult.error) {
                addMessage(
                    'Favorites Update',
                    'A problem occurred when trying to retrieve your favorite products. We apologize for the inconvenience.'
                )

                return []
            }

            delete favoriteProducts[removedProductId]
        }

        setNewUser({ ...user, favorites: Object.keys(favoriteProducts) })
        return favoriteProducts
    }, [user, getFullCollectionProducts, addMessage, setNewUser])

    if (!user) {
        return null
    }

    return (
        <UserContext.Provider value={{
            user,
            setNewUser,
            editShoppingCart,
            handlePurchase,
            getFullCartProducts,
            getFullFavoriteProducts
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextInitializer
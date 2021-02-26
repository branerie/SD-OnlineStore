import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from './UserContext'
import ErrorContext from './ErrorContext'
import { useAsyncError } from './hooks'
import { changeShoppingCart, makePurchase, verifyUser } from './services/user'
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
    cart: [],
    purchaseHistory: [], 
}

const UserContextInitializer = ({ children }) => {
    const [productInfo, setProductInfo] = useState({})
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
        } catch(error) {
            setNewUser()
        }
	}, [setNewUser])

    useEffect(() => {
        verifyCurrentUser()
    }, [verifyCurrentUser])

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
        } catch(error) {
            throwInternalError()
        }
    }, [user, throwInternalError, addMessage])

    const handlePurchase = useCallback(async () => {
        const result = await makePurchase()
        if (result.error) {
            return addMessage(
                'Cart Purchase',
                result.displayError || 
                'An error occurred while trying to process your request. Please be patient as we try to solve this issue.'
            )
        }

        const purchase = user.cart
        setNewUser({ 
            ...user, 
            cart: [], 
            purchaseHistory: [...user.purchaseHistory, { products: purchase, dateAdded: new Date() }] 
        })
    }, [setNewUser, addMessage, user])

    const getFullCollectionProducts = useCallback(async (productIds) => {
        const productsWithoutInfo = productIds.filter(p => { 
            return !productInfo[p.productId]
        })

        let newProductInfo = productInfo
        if (productsWithoutInfo.length > 0) {
            const requestResult = await getProductDetailsMain(productsWithoutInfo)
            if (requestResult.error) {
                throw new Error('Could not retrieve products info')
            }

            newProductInfo = { ...productInfo, ...requestResult }
            setProductInfo(newProductInfo)
        }

        const requiredProductsInfo = {}
        productIds.forEach(productId => {
            requiredProductsInfo[productId] = newProductInfo[productId]
        })

        return requiredProductsInfo
    }, [])

    const getFullCartProducts = useCallback(() => {
        const cartProductIds = Array.from(new Set(user.cart.map(p => p.productId)))
        return getFullCollectionProducts(cartProductIds)
    }, [user, getFullCollectionProducts])

    const getFullFavoriteProducts = useCallback(() => {
        return getFullCollectionProducts(user.favorites)
    }, [user, getFullCollectionProducts])

    const getFullHistoryProducts = useCallback(async () => {
        const productIds = new Set()
        user.purchaseHistory.forEach(purchase => {
            purchase.products.forEach(product => {
                productIds.add(product.productId)
            })
        })

        return getFullCollectionProducts(Array.from(productIds))
    }, [user, getFullCollectionProducts])

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
            getFullHistoryProducts, 
            getFullFavoriteProducts 
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextInitializer
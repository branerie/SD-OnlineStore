import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import UserContext from './Context'
import Navigation from './navigation'

import { addToShoppingCart, verifyUser } from './services/user'
import { CART_COOKIE_NAME } from './utils/constants'
import { getCookie, setCookie } from './utils/cookie'

const GUEST_USER = { userId: null, isAdmin: false, favorites: [], cart: [] }

function App() {
	const [user, setUser] = useState(GUEST_USER)

	const verifyCurrentUser = useCallback(async () => {
		const userInfo = await verifyUser()
		if (userInfo.error) {
			//TODO: handle errors
		}

		if (!userInfo.userId) {
			const savedCartString = getCookie(CART_COOKIE_NAME)
			if (savedCartString) {
				userInfo.cart = JSON.parse(savedCartString)
			} else {
				userInfo.cart = []
			}
		}

		setUser(userInfo)
	}, [])

	useEffect(() => {
		verifyCurrentUser()
	}, [])

	const addToCart = useCallback(async (productId, sizeName, quantity) => {
		const cart = [...user.cart]

		const itemInCart = cart.find(i => 
							i.productId === productId && i.sizeName === sizeName)

		if (itemInCart) {
			itemInCart.quantity += quantity
		} else {
			cart.push({ productId, sizeName, quantity })
		}

		setUser({...user, cart: cart})

		if (user.userId) {
			const result = await addToShoppingCart(user.userId, productId, sizeName, quantity)

			if (result.error) {
				//TODO: handle errors
			}
		} else {
			setCookie(CART_COOKIE_NAME, JSON.stringify(cart), '10d')
		}
	}, [user])

	const setNewUser = (userProps = {}) =>  {
		setUser({...GUEST_USER, ...userProps})
	}

	if (!user) {
		return null
	}

	return (
		<UserContext.Provider value={{ user, setNewUser, addToCart }}>
			<Navigation />
		</UserContext.Provider>
	)
}

export default App

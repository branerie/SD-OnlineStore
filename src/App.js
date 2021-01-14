import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import UserContext from './Context'
import Navigation from './navigation'

import { changeShoppingCart, verifyUser } from './services/user'
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

	const editShoppingCart = useCallback(async (productId, sizeName, quantityChange) => {
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
				cart = cart.filter(i => i.productId !== productId && i.sizeName !== sizeName)
			}
		} else if (quantityChange > 0) {
			cart.push({ productId, sizeName, newQuantity })
		} else {
			return
		}

		setUser({ ...user, cart })
		newQuantity = Math.max(0, newQuantity)

		if (user.userId) {
			const result = await changeShoppingCart(user.userId, productId, sizeName, newQuantity)

			if (result.error) {
				//TODO: handle errors
			}
		} else {
			setCookie(CART_COOKIE_NAME, JSON.stringify(cart), '10d')
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
			<Navigation />
		</UserContext.Provider>
	)
}

export default App

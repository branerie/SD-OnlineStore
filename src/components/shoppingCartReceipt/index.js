import React, { useCallback, useContext, useMemo, useState } from 'react'
import styles from './index.module.css'
import SubmitButton from '../submitButton'
import ShoppingCartReceiptItem from '../shoppingCartReceiptItem'
import UserContext from '../../UserContext'
import ConfirmWindow from '../confirmWindow'
import ErrorContext from '../../ErrorContext'

const ShoppingCartReceipt = ({ productsInCart, setProductsInCart, isCheckout }) => {
    const [isConfirmActive, setIsConfirmActive] = useState(false)
    const { handlePurchase, user, setNewUser } = useContext(UserContext)
    const { addMessage } = useContext(ErrorContext)

    const [totalDiscountedPrice, totalOriginalPrice] = useMemo(() => {
        let totalDiscountedPrice = 0
        let totalOriginalPrice = 0
        for (let product of productsInCart) {
            totalOriginalPrice += product.price * product.quantity
            totalDiscountedPrice += product.discountPrice
                ? product.discountPrice * product.quantity
                : product.price * product.quantity
        }

        return [totalDiscountedPrice, totalOriginalPrice]
    }, [productsInCart])

    const adjustQuantities = useCallback((unavailablePurchases) => {
        const newProductsInCart = [...productsInCart]
        let productsRemoved = []
        for (const { productId, sizeName, availableQuantity } of unavailablePurchases) {
            const productsInCartIndex = newProductsInCart.findIndex(p => 
                    p.productId === productId && p.sizeName === sizeName)
                
            if (availableQuantity === 0) {
                newProductsInCart.splice(productsInCartIndex, 1)
                productsRemoved.push({ productId, sizeName })
                continue
            }

            const sizes = newProductsInCart[productsInCartIndex].sizes
            const currentSize = sizes.find(s => s.sizeName === sizeName)
            currentSize.count = availableQuantity
        }

        setProductsInCart(newProductsInCart)
        if (productsRemoved.length > 0) {
            setNewUser({
                ...user,
                cart: user.cart.filter(cartItem => !productsRemoved.some(productRemoved => 
                                                        productRemoved.productId === cartItem.productId && 
                                                        productRemoved.sizeName === cartItem.sizeName))
            })
        }
    }, [productsInCart, setNewUser, setProductsInCart, user])

    const handleConfirm = useCallback(async () => {
        const unavailablePurchases = await handlePurchase()
        if (unavailablePurchases) {
            adjustQuantities(unavailablePurchases)
            addMessage(
                'Product Quantities Adjusted', 
                'Your purchase could not be fulfilled. Some of the products are not available anymore.'
            )
        }

        setIsConfirmActive(false)
    }, [handlePurchase, addMessage, adjustQuantities])

    if (!productsInCart) {
        return null
    }

    const checkShouldDisableCheckout = () => {
        for (const { sizes, sizeName, quantity } of productsInCart) {
            const availableQuantity = sizes.find(s => s.sizeName === sizeName).count

            if (availableQuantity < quantity) {
                return true
            }
        }

        return false
    }

    return (
        <div className={styles.checkout}>
            <div className={styles.receipt}>
                { productsInCart.map(product => 
                    <ShoppingCartReceiptItem 
                        key={`${product.productId}_${product.sizeName}`} 
                        productId={product.productId} 
                        {...product} 
                    />
                )
                }
            </div>
            { totalDiscountedPrice < totalOriginalPrice
                ?
                <div className={styles['price-original']}>
                    <div>Pre-discount:</div>
                    <div>{totalOriginalPrice.toFixed(2)}$</div>
                </div>
                : null
            }
            <div className={styles['price-discounted']}>
                <div>Your Total:</div>
                <div>{totalDiscountedPrice.toFixed(2)}$</div>
            </div>
            { isCheckout &&
                <SubmitButton
                    type='button'
                    onClick={() => setIsConfirmActive(true)}
                    text='Checkout'
                    style={{ marginTop: '1.5rem', width: '100%' }}
                    disabled={checkShouldDisableCheckout()} 
                />
            }
            { isConfirmActive &&
                <ConfirmWindow 
                    hideWindow={() => setIsConfirmActive(false)} 
                    handleConfirm={handleConfirm}
                    title='Confirm Purchase'
                    text='Are you sure you want to purchase the items in your cart?'
                />
            }
        </div>
    )
}

export default ShoppingCartReceipt

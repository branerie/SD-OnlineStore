import React, { useContext, useMemo } from 'react'
import styles from './index.module.css'
import SubmitButton from '../../components/submitButton'
import ShoppingCartCheckoutItem from '../shoppingCartCheckoutItem'
import { makePurchase } from '../../services/user'
import ErrorContext from '../../ErrorContext'
import UserContext from '../../UserContext'

const ShoppingCartCheckout = ({ productsInCart }) => {
    const { addMessage } = useContext(ErrorContext)
    const { user, setNewUser } = useContext(UserContext)

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

    const handlePurchase = async () => {
        const result = await makePurchase()
        if (result.error) {
            return addMessage(
                'Cart Purchase',
                result.displayError || 
                'An error occurred while trying to process your request. Please be patient as we try to solve this issue.'
            )
        }

        setNewUser({ ...user, cart: [] })
    }

    return (
        <div className={styles.checkout}>
            <div className={styles.receipt}>
                {productsInCart.map(product => 
                    <ShoppingCartCheckoutItem key={product.productId} {...product} />)
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
                <div>Total Today:</div>
                <div>{totalDiscountedPrice.toFixed(2)}$</div>
            </div>
            <SubmitButton
                type='button'
                onClick={handlePurchase}
                text='Checkout'
                style={{ marginTop: '1.5rem', width: '100%' }} 
            />
        </div>
    )
}

export default ShoppingCartCheckout

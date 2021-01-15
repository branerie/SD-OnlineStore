import React, { useMemo } from 'react'
import styles from './index.module.css'
import SubmitButton from '../../components/submitButton'
import ShoppingCartCheckoutItem from '../shoppingCartCheckoutItem'

const ShoppingCartCheckout = ({ productsInCart }) => {
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

    return (
        <div className={styles.checkout}>
            <div className={styles.receipt}>
                {productsInCart.map(product => 
                    <ShoppingCartCheckoutItem {...product} />)
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
            <SubmitButton text='Checkout' style={{ marginTop: '1.5rem', width: '100%' }} />
        </div>
    )
}

export default ShoppingCartCheckout

import React, { useContext, useMemo } from 'react'
import styles from './index.module.css'
import SubmitButton from '../submitButton'
import ShoppingCartReceiptItem from '../shoppingCartReceiptItem'
import UserContext from '../../UserContext'

const ShoppingCartReceipt = ({ productsInCart, isCheckout }) => {
    const { handlePurchase } = useContext(UserContext)

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
                { productsInCart.map(product => 
                    <ShoppingCartReceiptItem key={product.productId} {...product} />)
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
                    onClick={handlePurchase}
                    text='Checkout'
                    style={{ marginTop: '1.5rem', width: '100%' }} 
                />
            }
        </div>
    )
}

export default ShoppingCartReceipt

import React from 'react'
import styles from './index.module.css'
import { shortenText } from '../../utils/text'

const ShoppingCartReceiptItem = ({ 
    brand,
    description,
    discountPrice,
    price,
    quantity,
    sizeName,
    productId
}) => {
    const shortenedDescription = shortenText(description, 30)

    const finalPrice = discountPrice ? discountPrice : price

    return (
        <div className={styles['receipt-item']} key={`${productId}-${sizeName}`}>
            <div className={styles['receipt-item-qty']}>
                {`${quantity} x `}
            </div>
            <div className={styles['receipt-item-desc']}>
                <span className={styles['receipt-brand']}>
                    {brand}, {sizeName}
                </span>
                <span>{shortenedDescription}</span>
            </div>
            <div className={styles['receipt-price']}>
                {(finalPrice * quantity).toFixed(2)}$
            </div>
        </div>
    )
}

export default ShoppingCartReceiptItem
import React from 'react'
import styles from './index.module.css'

const shortenText = (text, maxChars) => {
    if (text.length <= maxChars) {
        return text
    }

    let maxIndex = maxChars - 1
    while (text[maxIndex] !== ' ') {
        maxIndex--
    }

    return `${text.slice(0, maxIndex)}...`
}

const ShoppingCartCheckoutItem = ({ 
    brand,
    description,
    discountPrice,
    price,
    quantity,
    sizeName
}) => {
    const shortenedDescription = shortenText(description, 30)

    const finalPrice = discountPrice ? discountPrice : price

    return (
        <div className={styles['receipt-item']}>
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

export default ShoppingCartCheckoutItem
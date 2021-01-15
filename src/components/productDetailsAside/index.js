import React, { useState } from 'react'
import styles from './index.module.css'
import SizeButton from '../sizeButton'
import AddToCartButton from '../addToCartButton'
import FavoritesIcon from '../favoritesIcon'

const ProductDetailsAside = ({ id, brand, sizes, price, discount, discountPrice }) => {
    const [selectedSize, setSelectedSize] = useState(null)

    const finalPrice = discountPrice ? discountPrice : price

    return (
        <aside className={styles.container} >
            <h2 className={styles.title}>{brand}</h2>
            <h3 className={styles['title-minor']}>Size:</h3>
            <div className={styles['sizes-container']}>
                {
                    sizes.map(s => {
                        return (
                            <SizeButton
                                sizeName={s.sizeName}
                                handleSelect={setSelectedSize}
                                isSelected={s.sizeName === selectedSize}
                            />
                        )
                    })
                }
            </div>
            <div className={styles.price}>
                {discountPrice && `${price.toFixed(2)}$  -${discount.percent}% =`}
                <div className={styles['price-final']}>
                    {finalPrice.toFixed(2)}$
                </div>
            </div>
            <AddToCartButton productId={id} selectedSize={selectedSize} />
            <div className={styles.favorites}>
                <label>Add to wish list:</label>
                <FavoritesIcon productId={id} />
            </div>
        </aside>
    )
}

export default ProductDetailsAside
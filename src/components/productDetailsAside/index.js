import React, { useState } from 'react'
import styles from './index.module.css'
import SizeButton from '../sizeButton'
import AddToCartButton from '../addToCartButton'
import FavoritesIcon from '../favoritesIcon'
import ProductSizes from '../productSizes'

const ProductDetailsAside = ({ 
    id, 
    brand, 
    sizes, 
    price, 
    discount, 
    discountPrice, 
    description 
}) => {
    const [selectedSize, setSelectedSize] = useState(null)

    const finalPrice = discountPrice ? discountPrice : price

    return (
        <aside className={styles.container} >
            <div className={styles.title}>
                <h2 className={styles.brand}>{brand}</h2>
                { description && 
                    <div className={styles.description}>
                        {description}
                    </div>
                }
            </div>
            <h3 className={styles['title-minor']}>Size:</h3>
            <div className={styles['sizes-container']}>
                <ProductSizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            </div>
            <div className={styles.price}>
                {discountPrice && `${price.toFixed(2)}$  -${discount.percent}% =`}
                <div className={styles['price-final']}>
                    {finalPrice.toFixed(2)}$
                </div>
            </div>
            <AddToCartButton productId={id} selectedSize={selectedSize} />
            <div className={styles.favorites}>
                <label>Add to favorites:</label>
                <FavoritesIcon productId={id} />
            </div>
        </aside>
    )
}

export default ProductDetailsAside
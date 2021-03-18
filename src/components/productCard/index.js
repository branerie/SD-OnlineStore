import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import RatingStars from '../ratingStar'
import FavoritesIcon from '../favoritesIcon'

const ProductCard = ({
    brand,
    currency,
    discount,
    discountPrice,
    images,
    price,
    productId,
    ratingCount,
    ratingStars,
}) => {
    return (
        <div className={styles.container}>
            <Link to={`/product/details/${productId}`}>
                {/* eslint-disable-next-line */}
                <img
                    src={images && images[0]}
                    alt='No image'
                    className={styles['product-image']}
                />
            </Link>
            <div className={styles['text-container']}>
                <div className={styles['brand-likeButton']}>
                    <div className={styles.brand}>
                        {brand}
                    </div>
                    <FavoritesIcon productId={productId} />
                </div>
                <div className={styles['price-container']}>
                    <div className={discountPrice ? styles['price-discount'] : styles.price}>
                        {price.toFixed(2)}{currency || '$'}
                    </div>

                    {discountPrice &&
                        <div
                            className={styles['discount-style']}
                            data-testid={`discount-${productId}`}
                        >
                            {`-${parseInt(discount.percent)}% = ${discountPrice.toFixed(2)}${currency || '$'}`}
                        </div>
                    }

                </div>
                <div className={styles['rating-view']}>
                    <RatingStars
                        productId={productId}
                        ratingStars={ratingStars}
                        ratingCounter={ratingCount}
                    />
                    {/* <Link to={''} className={styles.link}>VIEW</Link> */}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
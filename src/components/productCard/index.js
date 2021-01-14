import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import UserContext from '../../Context'
import RatingStars from '../ratingStar'
import FavoritesIcon from '../favoritesIcon'

const ProductCard = (props) => {
    const { addToCart } = useContext(UserContext)

    const currency = props.currency ? props.currency : '$'

    let discount = null
    if (props.discount) {
        const discPrice = props.discountPrice.toFixed(2)
        const discPercent = props.discount.percent

        discount = `-${parseInt(discPercent)}% = ${discPrice}${currency}`
    }

    return (
        <div className={styles.container}>
            <Link to={`/product/details/${props.id}`}>
                <img
                    src={props.images && props.images[0]}
                    alt='No image'
                    className={styles['product-image']}
                />
            </Link>
            <div className={styles['text-container']}>
                <div className={styles['brand-likeButton']}>
                    <div className={styles.brand}>
                        {props.brand}
                    </div>
                    <FavoritesIcon productId={props.id} />
                </div>
                <div className={styles['price-container']}>
                    <div className={props.discountPrice ? styles['price-discount'] : styles.price}>
                        {props.price.toFixed(2)}{currency}
                    </div>

                    {props.discountPrice &&
                        <div
                            className={styles['discount-style']}
                            data-testid={`discount-${props.id}`}
                        >
                            {discount}
                        </div>
                    }

                </div>
                <div className={styles['rating-view']}>
                    <RatingStars
                        key={props.id}
                        productId={props.id}
                        ratingStars={props.ratingStars}
                        ratingCounter={props.ratingCount}
                    />
                    <button onClick={() => addToCart(props.id, 'M', 1)}>
                        Add to Cart
                    </button>
                    {/* <Link to={''} className={styles.link}>VIEW</Link> */}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
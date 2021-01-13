import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import { setFavorites } from '../../services/user.js'
import favoritesImageEmpty from '../../images/favoritesLink.svg'
import favoritesImageFilled from '../../images/favoritesLinkFilled.svg'
import RatingStars from '../ratingStar'
import { Link } from 'react-router-dom'

const NO_IMAGES_TEXT = 'No image'

const ProductCard = (props) => {
    const { user, setUser } = useContext(UserContext)

    const isInFavorites = user.favorites.includes(props.id)
    const currency = props.currency ? props.currency : '$'

    let discount = null
    if (props.discount) {
        const discPrice = props.discountPrice.toFixed(2)
        const discPercent = props.discount.percent

        discount = `-${parseInt(discPercent)}% = ${discPrice}${currency}`
    }

    const changeFavorites = async () => {
        const response = await setFavorites(props.id)

        if (response.error) {
            //TODO handle errors
        }

        setUser({ ...user, favorites: response.favorites })
    }

    const imgSrc = isInFavorites ? favoritesImageFilled : favoritesImageEmpty

    return (
        <div className={styles.container}>
            <Link to={`/product/details/${props.id}`}>
            <img
                src={props.images && props.images[0]}
                alt={NO_IMAGES_TEXT}
                className={styles['product-image']}
            />
            </Link>
            <div className={styles['text-container']}>
                <div className={styles['brand-likeButton']}>
                    <div className={styles.brand}>
                        {props.brand}
                    </div>
                    <div className={styles['like-container']}>
                        <img
                            onClick={changeFavorites}
                            src={imgSrc} alt={NO_IMAGES_TEXT}
                            title={'Favorite collection'}
                            className={styles['like-button']}
                        />
                    </div>
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
                    {/* <Link to={''} className={styles.link}>VIEW</Link> */}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
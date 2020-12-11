import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import UserContext from '../../Context'
import { setFavorites } from '../../services/user.js'
import cardFrame from '../../images/productCardFrame.svg'
import favotiesImageEmpty from '../../images/favoritesLink.svg'
import favotiesImageFill from '../../images/favoritesLinkFilled.svg'
import RatingStars from '../ratingStar'

const NO_IMAGES = 'No image'

const ProductCard = (props) => {
    let discount = null
    const { user, setUser } = useContext(UserContext)
    const isInFavorites = user.favorites.includes(props.id)

    if (props.discount) {
        const discPrice = props.discountPrice.toFixed(2)
        const discPercent = props.discount.percent

        discount = `-${parseInt(discPercent)}% = ${discPrice}$`
    }
  
   const changeFavorites = async () => {
        const response = await setFavorites(props.id)

        if (response.error) {
            //TODO handle errors
        }

        setUser({...user, favorites: response.favorites})
   }

    const imgSrc = isInFavorites ? favotiesImageFill : favotiesImageEmpty
    
    return (
        <div className={styles.container}>
            <img src={cardFrame} className={styles.frame} alt={NO_IMAGES}/>
            <img src={props.images} alt={NO_IMAGES}  className={styles['product-image']}/>
            <div className={styles['text-container']}>
                <div className={styles['brand-likeButton']}>                    
                    <div className={styles.brand}>{props.brand}</div>
                    <img onClick={changeFavorites} src={imgSrc} alt={NO_IMAGES} title={'Favorite collection'} className={styles['like-button']}/>                    
                </div>
                <div className={styles['price-container']}>
                        { props.discountPrice 
                            ? <div className={styles['price-discount']}>{props.price}$</div>
                            : <div className={styles.price}>{props.price}$</div>
                        }
                    
                    <div className={styles['discount-style']}>
                        { props.discountPrice ? discount : null}</div>
                </div>
                <div className={styles['rating-view']}>
                    <RatingStars
                        key={props.id}
                        productId={props.id}
                        ratingStars={props.ratingStars}
                        ratingCounter={props.ratingCount}
                    />
                    <Link to={''} className={styles.link}>VIEW</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
import React from 'react'
import styles from './index.module.css'
import cardFrame from '../../images/productCardFrame.svg'
import favotiesImage from '../../images/favoritesLink.svg'

const ProductCard = (props) => {
    let discount = null   

    if(props.discount) {
        console.log(props.discount.percent)
        const discPrice = props.discountPrice.toFixed(2)
        const discPercent = props.discount.percent

        discount = `-${parseInt(discPercent)}% = ${discPrice}$`
    }
   

    return (
        <div className={styles.container}>
            <img src={cardFrame}/>
            <img src={props.images} alt={'No images'}  className={styles['product-image']}/>
            <div className={styles['text-container']}>
                <div className={styles['brand-likeButton']}>                    
                    <div className={styles.brand}>{props.brand}</div>
                    <img src={favotiesImage} className={styles['like-button']}/>                 
                </div>
                <div className={styles['price-container']}>
                    <div className={styles.price}>{props.price}$</div>
                    <div className={styles['discount-style']}>
                        { props.discountPrice ? discount : null}</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
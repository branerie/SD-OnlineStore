import React from 'react'
import styles from './index.module.css'
import cardFrame from '../../images/productCardFrame.svg'

const ProductCard = (props) => {

    return (
        <div className={styles.container}>
            <img src={cardFrame} className={styles['image-frame']}/>
            <img src={props.images} alt={'No images'}  className={styles['product-image']}/>
            <p className={styles.brand}>{props.brand}</p>
            <p className={styles.price}>{props.price}</p>
            <p className={styles.discount}>
                { props.discountPrice ? props.discountPrice.toFixed(2) : null}</p>
        </div>
    )
}

export default ProductCard
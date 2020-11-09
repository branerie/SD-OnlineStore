import React from 'react'
import styles from './index.module.css'
import image from '../../images/1111.jpg'

const ProductCard = (props) => {

    return (
        <div className={styles.container}>
            <img alt='product' className={styles.img} src={image} />
            <p className={styles.brand}>{props.brand}</p>
            <p className={styles.price}>{props.price}</p>
            <p className={styles.discount}>{props.discountPrice}</p>
        </div>
    )
}

export default ProductCard
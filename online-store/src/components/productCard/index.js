import React from 'react'
import styles from './index.module.css'

const ProductCard = (props) => {

    return (
        <div className={styles.container}>
            <p className={styles.brand}>{props.brand}</p>
            <p className={styles.price}>{props.price}</p>
            <p className={styles.discount}>
                { props.discountPrice ? props.discountPrice.toFixed(2) : null}</p>
        </div>
    )
}

export default ProductCard
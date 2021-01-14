import React, { useState } from 'react'
import styles from './index.module.css'
import QuantityInput from '../inputFields/quantityInput'
import FavoritesIcon from '../favoritesIcon'

import removeIcon from '../../images/delete.png'

const ShoppingCartItem = ({
    productId,
    brand,
    description,
    price,
    sizeName,
    image,
    quantity
}) => {
    const [itemQuantity, setItemQuantity] = useState(quantity)

    return (
        <div className={styles.container}>
            <div className={styles['img-container']}>
                <img className={styles.image} src={image} alt='No image' />
            </div>
            <div className={styles['info-container']}>
                <div className={styles['info-container-overview']}>
                    <div>
                        <h3 className={styles.brand}>{brand}</h3>
                        <p className={styles.info}>{description}</p>
                        <p className={styles.info}>Size: {sizeName}</p>
                    </div>
                    <QuantityInput
                        value={itemQuantity}
                        setNewValue={setItemQuantity}
                        min={1}
                        max={999}
                    />
                </div>
                <div className={styles.column}>
                    <div className={styles['btn-container']}>
                        <FavoritesIcon productId={productId} />
                        <img
                            src={removeIcon}
                            alt='Remove'
                            className={styles['btn-remove']}
                            
                        />
                    </div>
                    <div>
                        {price.toFixed(2)}$
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartItem
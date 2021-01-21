import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import QuantityInput from '../inputFields/quantityInput'
import FavoritesIcon from '../favoritesIcon'

import removeIcon from '../../images/delete.png'
import UserContext from '../../UserContext'
import { Link } from 'react-router-dom'

let changeTimeout = null

const ShoppingCartItem = ({
    productId,
    brand,
    description,
    price,
    discountPrice,
    image,
    sizeName,
    quantity
}) => {
    const [itemQuantity, setItemQuantity] = useState(quantity)
    const { editShoppingCart } = useContext(UserContext)

    const handleItemRemove = () => {
        editShoppingCart(productId, sizeName, -quantity)
    }

    useEffect(() => {
        if (quantity === itemQuantity) {
            return
        }

        window.clearTimeout(changeTimeout)

        changeTimeout = window.setTimeout(() => {
            editShoppingCart(productId, sizeName, itemQuantity - quantity)
        }, 1000)
    }, [itemQuantity])

    return (
        <div className={styles.container}>
            <div className={styles['img-container']}>
                <Link to={`/product/details/${productId}`}>
                    <img className={styles.image} src={image} alt='No image' />
                </Link>
            </div>
            <div className={styles['info-container']}>
                <div className={styles['info-container-overview']}>
                    <div>
                        <h3 className={styles.brand}>{brand}</h3>
                        <p className={styles.info}>{description}</p>
                        <p className={styles.info}>Size: {sizeName}</p>
                    </div>
                    Quantity:
                    <QuantityInput
                        value={itemQuantity}
                        setNewValue={setItemQuantity}
                        min={1}
                        max={99}
                    />
                </div>
                <div className={styles.column}>
                    <div className={styles['btn-container']}>
                        <FavoritesIcon productId={productId} />
                        <img
                            src={removeIcon}
                            alt='Remove'
                            className={styles['btn-remove']}
                            onClick={handleItemRemove}
                        />
                    </div>
                    { discountPrice
                        ?
                        <div className={styles.price}>
                            <div className={styles['price-original']}>
                                {price.toFixed(2)}$
                            </div>
                            {discountPrice.toFixed(2)}$
                        </div>
                        :
                        <div className={styles.price}>
                            {(quantity * price).toFixed(2)}$
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartItem
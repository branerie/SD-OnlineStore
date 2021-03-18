import React, { useCallback, useContext, useState } from 'react'
import styles from './index.module.css'
import QuantityInput from '../InputFields/QuantityInput'
import FavoritesIcon from '../FavoritesIcon'

import removeIcon from '../../images/delete.png'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'

const QUANTITY_WARNING_THRESHOLD = 10

const ShoppingCartItem = ({
    productId,
    brand,
    description,
    price,
    discountPrice,
    image,
    sizeName,
    sizeQuantity,
    quantity
}) => {
    const [itemQuantity, setItemQuantity] = useState(quantity)
    const [editTimeout, setEditTimeout] = useState(null)
    const { editShoppingCart } = useContext(UserContext)

    const handleItemRemove = () => {
        editShoppingCart(productId, sizeName, -quantity)
    }

    const changeItemQuantity = useCallback((newQuantity) => {
        if (newQuantity > sizeQuantity) {
            return
        }

        setItemQuantity(newQuantity)
    
        window.clearTimeout(editTimeout)
        const newEditTimeout = window.setTimeout(() => {
            editShoppingCart(productId, sizeName, newQuantity - quantity)
        }, 500)
    
        setEditTimeout(newEditTimeout)
    }, [editTimeout, sizeQuantity, quantity, productId, sizeName, editShoppingCart])

    return (
        <div className={styles.container}>
            <div className={styles['img-container']}>
                <Link to={`/product/details/${productId}`}>
                {/* eslint-disable-next-line */}
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
                        setNewValue={changeItemQuantity}
                        min={1}
                        max={sizeQuantity}
                    />
                    { sizeQuantity < QUANTITY_WARNING_THRESHOLD &&  
                        <div>
                            Only <span className={styles.warning}>{sizeQuantity}</span> remaining!
                        </div>
                    }
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
import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../contexts/UserContext'

const BUTTON_TEXT = 'ADD TO BAG'

const AddToCartButton = ({ productId, selectedSize }) => {
    const [addQuantity, setAddQuantity] = useState(0)
    const [editTimeout, setEditTimeout] = useState(null)
    const { editShoppingCart } = useContext(UserContext)

    const handleShoppingCartEdit = () => {
        setAddQuantity(addQuantity + 1)

        window.clearTimeout(editTimeout)
        const newEditTimeout = window.setTimeout(() => {
            editShoppingCart(productId, selectedSize, addQuantity + 1)
            setAddQuantity(0)
        }, 1000)

        setEditTimeout(newEditTimeout)
    }

    return (
        <>
            { selectedSize
            ?
                <div 
                    className={styles['bag-link']}
                    onClick={handleShoppingCartEdit}
                >
                    {BUTTON_TEXT}
                </div>
            :
                <div className={`${styles['bag-link']} ${styles['bag-link-deactivated']}`}>
                    {BUTTON_TEXT}
                </div>
            }
        </>
        
    )
}

export default AddToCartButton
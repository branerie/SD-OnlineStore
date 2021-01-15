import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'

const BUTTON_TEXT = 'ADD TO BAG'

const AddToCartButton = ({ productId, selectedSize }) => {
    const { editShoppingCart } = useContext(UserContext)

    return (
        <>
            { selectedSize
            ?
                <div 
                    className={styles['bag-link']}
                    onClick={() => editShoppingCart(productId, selectedSize, 1)}
                >
                    {BUTTON_TEXT}
                </div>
            :
                <div className={[styles['bag-link'], styles['bag-link-deactivated']].join(' ')}>
                    {BUTTON_TEXT}
                </div>
            }
        </>
        
    )
}

export default AddToCartButton
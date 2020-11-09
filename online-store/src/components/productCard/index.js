import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import image from '../../images/1111.jpg'
import UserContext from '../../Context'

const ProductCard = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const user = useContext(UserContext)

    const changeEditingState = () => {
        setIsEditing(!isEditing)
    }

    return (
        <div className={styles.container}>
            <img alt='product' className={styles.img} src={image} />
            <p className={styles.brand}>{props.brand}</p>
            <p className={styles.price}>{props.price}</p>
            <p className={styles.discount}>{props.discountPrice}</p>

            {user.isAdmin ? 
             (<div className={styles.adminButtons}>
                 <button onClick={changeEditingState}>Edit</button>
                 <button>Delete</button>
             </div>) : null}        
        </div>
    )
}

export default ProductCard
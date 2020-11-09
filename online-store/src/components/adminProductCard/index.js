import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import ProductCard from '../productCard'
import InputProductCard from '../inputProductCard'

const AdminProductCard = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const user = useContext(UserContext)

    const changeEditingState = () => {
        setIsEditing(!isEditing)
       
    }


    return (
        <div className={styles.container}>
            
                {isEditing ? <InputProductCard key={props.id} {...props} /> : <ProductCard key={props.id} {...props} /> }

                {user.isAdmin ?
                    <div className={styles.adminButtons}>
                        <button onClick={changeEditingState}>Edit</button>
                        <button>Delete</button>
                    </div> : null}
            
        </div>
             )
}

export default AdminProductCard
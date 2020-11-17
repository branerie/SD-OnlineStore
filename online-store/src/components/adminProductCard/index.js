import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import ProductCard from '../productCard'
import ModifyProductCard from '../modifyProductCard'
import getCookie from '../../utils/cookie'


const AdminProductCard = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const user = useContext(UserContext)
    const id = props.id

    const changeEditingState = () => {
        setIsEditing(!isEditing)
       
    }

const handleDelete = async (event) => {
    event.preventDefault()

    await fetch(`http://localhost:3001/api/admin/product/${id}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('x-auth-cookie')
        }
    })
}

    return (
        <div className={styles.container}>
            
                {isEditing ? <ModifyProductCard key={props.id} {...props} /> : <ProductCard key={props.id} {...props} /> }

                {user.isAdmin ?
                    <div className={styles.adminButtons}>
                        <button onClick={changeEditingState}>Edit</button>
                        <button onClick={e => handleDelete(e)} className={styles.confirmButton && styles.button3}>Delete</button>
                        
                        
                    </div> : null}
            
        </div>
             )
}

export default AdminProductCard
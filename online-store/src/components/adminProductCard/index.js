import React, { useCallback, useContext, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import ProductCard from '../productCard'
import ModifyProductCard from '../modifyProductCard'
import getCookie from '../../utils/cookie'
import ProductsContext from '../../ProductsContext'
import AdminImageCards from '../adminImageCards'


const AdminProductCard = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const user = useContext(UserContext)
    const productsContext = useContext(ProductsContext)

    const id = props.id

    const changeEditingState = () => {
        setIsEditing(!isEditing)
    }

    const handleDelete = useCallback(async (event) => {
        event.preventDefault()

        await fetch(`http://localhost:3001/api/admin/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-cookie')
            }
        })

        productsContext.handleProductDelete(id)
        productsContext.updateFilters()
        productsContext.updateProductsPage()
    })

    return (
        <div className={styles.container}>
            <AdminImageCards images={props.images} productId={id} />
            {isEditing
                ? <ModifyProductCard
                        key={props.id}
                        {...props}  />
                : <ProductCard key={props.id} {...props} />}

            {user.isAdmin ?
                <div className={styles.adminButtons}>
                    <button onClick={changeEditingState}>Edit</button>
                    <button
                        onClick={e => handleDelete(e)}
                        className={styles.confirmButton && styles.button3}>
                        Delete
                    </button>
                </div> : null}

        </div>
    )
}

export default AdminProductCard
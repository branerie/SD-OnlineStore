import React, { useCallback, useContext, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'

import ProductCard from '../productCard'
import ModifyProductCard from '../modifyProductCard'
import ProductsContext from '../../ProductsContext'
import AdminImageCards from '../adminImageCards'

import { deleteProduct } from '../../services/adminProduct'


const AdminProductCard = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const { user: { isAdmin }} = useContext(UserContext)
    const productsContext = useContext(ProductsContext)

    const id = props.id

    const changeEditingState = () => {
        setIsEditing(!isEditing)
    }

    const handleDelete = useCallback(async (event) => {
        event.preventDefault()

        const deleteResult = await deleteProduct(id)
        if (deleteResult.error) {
            //TODO: handle errors
        }

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

            {isAdmin ?
                <div className={styles.adminButtons}>
                    <button onClick={changeEditingState}>Edit</button>
                    <button
                        onClick={e => handleDelete(e)}
                        className={styles['delete-btn']}>
                        Delete
                    </button>
                </div> : null}
        </div>
    )
}

export default AdminProductCard
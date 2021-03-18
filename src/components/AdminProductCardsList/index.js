import React, { useContext } from 'react'
import styles from './index.module.css'
import AdminProductCard from '../AdminProductCard'
import ProductsContext from '../../contexts/ProductsContext'

const AdminProductCardsList = () => {
    const { productPage } = useContext(ProductsContext)

    function renderProduct() {
        if (!productPage) {
            return null
        }

        return productPage.map(product => {
            return (
                <AdminProductCard key={product.id} {...product} />
            )
        })
    }

    return (
        <div className={styles.container}>
            {renderProduct()}
        </div>
    )
}

export default AdminProductCardsList
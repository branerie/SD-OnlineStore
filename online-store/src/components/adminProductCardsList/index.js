import React from 'react'
import styles from './index.module.css'
import AdminProductCard from '../adminProductCard'

const AdminProductCardsList = ({ productPage, onProductDelete }) => {
    function renderProduct() {
        if (!productPage) {
            return <div>Loading product cards...</div>
        }

        return productPage.map(product => {
            return (
                <AdminProductCard
                    key={product.id}
                    {...product}
                    onProductDelete={onProductDelete} />
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
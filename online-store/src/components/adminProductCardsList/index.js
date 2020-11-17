import React from 'react'
import styles from './index.module.css'
import AdminProductCard from '../adminProductCard'

const AdminProductCardsList = (props) => {
    const productPage = props.productPage

    function renderProduct() {
        if (!productPage) {
            return <div>Loading product cards...</div>
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
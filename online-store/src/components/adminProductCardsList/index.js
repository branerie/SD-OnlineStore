import React, { useContext } from 'react'
import styles from './index.module.css'
import AdminProductCard from '../adminProductCard'
import ProductsContext from '../../ProductsContext'

const AdminProductCardsList = () => {
    const productsContext = useContext(ProductsContext)
    const { productPage } = productsContext

    function renderProduct() {
        if (!productPage) {
            return <></>
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
import React, { useEffect, useState, useCallback } from 'react'
import styles from './index.module.css'
import AdminProductCard from '../adminProductCard'
import { getProductsPage } from '../../utils/product'

const AdminProductCardsList = (props) => {
    // const [productPage, setProductPage] = useState(null)
    // const [page, setPage] = useState(0)

    // const currentProductDb = useCallback(async (page) => {
    //     const productInfo = await getProductsPage(page)

    //     setProductPage(productInfo)
    // }, [setProductPage])

    // useEffect(() => {
    //     currentProductDb(page)
    // }, [currentProductDb, page])

    const productPage = props.productPage
    const page = props.page

    function renderProduct() {
        if (!productPage) {
            return <div>Loading product cards...</div>
        }
        console.log(productPage)

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
import React, { useEffect, useState, useCallback } from 'react'
import styles from './index.module.css'
import AsideCard from '../productsCheckboxFilter'
import  { getProductRanges }  from '../../utils/product'

const AdminAside = () => {
    const [productProps, setProductProps] = useState(null)

    const getProductPropsRange = useCallback(async () => {
        const productPropRanges = await getProductRanges()
        setProductProps(productPropRanges)
    }, [setProductProps])

    useEffect(() => {
        getProductPropsRange()
    },[getProductPropsRange])

    if (!productProps) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className={styles.container}>
            <AsideCard title='Categories' values={productProps.categories} />
            <AsideCard title='Brands' values={productProps.brand} />
            <AsideCard title='Sizes' values={productProps.sizes} />
        </div>
    )
}

export default AdminAside
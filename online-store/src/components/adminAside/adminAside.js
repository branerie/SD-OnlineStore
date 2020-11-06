import React, { useEffect, useState, useCallback } from 'react'
import AsideCard from '../asideCard'
import  getProductRanges  from '../../utils/product'

const AdminAside = () => {
    const [productProps, setProductProps] = useState(null)

    const getProductPropsRange = useCallback(async () => {
        const productPropRanges = await getProductRanges()
        setProductProps(productPropRanges)
    }, [setProductProps])

    useEffect(() => {
        getProductPropsRange()
    },[])

    if (!productProps) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <AsideCard title='Category' values={productProps.categories} />
            <AsideCard title='Brands' values={productProps.brands} />
            <AsideCard title='Size' values={productProps.sizes} />
        </div>
    )
}

export default AdminAside
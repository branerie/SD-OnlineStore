import React, { useEffect, useState, useCallback } from 'react'
import AsideCard from '../asideCard'
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
        return
    }

    return (
        <div>
            <AsideCard title='Categories' values={productProps.categories} />
            <AsideCard title='Brands' values={productProps.brand} />
            <AsideCard title='Sizes' values={productProps.sizes} />
        </div>
    )
}

export default AdminAside
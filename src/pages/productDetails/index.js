import React, { useCallback, useEffect, useState } from 'react'
import ProductDetailsBody from '../../components/productDetailsBody'
import Header from '../../components/header'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../services/product'
import PageWrapper from '../../components/pageWrapper'

const ProductDetails = () => {
    const { id } = useParams()
    const [currentProduct, setCurrentProduct] = useState(null)

    const getCurrentProduct = useCallback(async () => {
        const response = await getProductDetails(id)
        if (response.error) {
            //TODO: handle errors
            return
        }

        setCurrentProduct(response)

    }, [id])

    useEffect(() => {
        getCurrentProduct()
    }, [getCurrentProduct])

    if (!currentProduct) {
        return null
    }

    return (
        <PageWrapper>
            <Header />
            <ProductDetailsBody product={currentProduct} />
        </PageWrapper>
    )
}

export default ProductDetails
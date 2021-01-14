import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ProductDetailsBody from '../../components/productDetailsBody'
import { useParams } from 'react-router-dom'
import { getProductForDetails } from '../../services/product'

const ProductDetails = () => {
    const { id } = useParams()
    const [currentProduct, setCurrentProduct] = useState(null)

    const getCurrentProduct = useCallback(async () => {
        const response =  await getProductForDetails(id)
        if (response.error) { 
            //TODO: handle errors
        }

        setCurrentProduct(response)

    },[id])

    useEffect(() => {
        getCurrentProduct()
    },[getCurrentProduct])

    if(!currentProduct) {
        return null
    }

    return (
        <>
            <Header />
            <ProductDetailsBody product={currentProduct} />
            <Footer />
        </>
    )
}

export default ProductDetails
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ErrorContext from '../../ErrorContext'
import ProductDetailsBody from '../../components/productDetailsBody'
import Header from '../../components/header'
import { useHistory, useParams } from 'react-router-dom'
import { getProductDetails } from '../../services/product'
import PageWrapper from '../../components/pageWrapper'

const ProductDetails = () => {
    const { id } = useParams()
    const [currentProduct, setCurrentProduct] = useState(null)
    const { addMessage } = useContext(ErrorContext)
    const history = useHistory()

    const getCurrentProduct = useCallback(async () => {
        const response = await getProductDetails(id)
        if (response.error) {
            addMessage(
                'Product Details', 
                'An error occurred while trying to receive product information. Please be patient as we try to solve this issue.'
            )

            return history.goBack()
        }

        setCurrentProduct(response)
    }, [id, history, addMessage])

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
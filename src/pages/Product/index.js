import React from 'react'
import ProductsContextInitializer from '../../contexts/ProductsContextInitializer'
import ProductPageBody from '../../components/ProductPageBody'
import PageWrapper from '../../components/PageWrapper'
import Header from '../../components/Header'

const ProductPage = ({ pageLength }) => {
    return (
        <ProductsContextInitializer pageLength={pageLength}>
            <PageWrapper>
                <Header />
                <ProductPageBody pageLength={pageLength} />
            </PageWrapper>
        </ProductsContextInitializer>
    )
}

export default ProductPage
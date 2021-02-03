import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'
import ProductPageBody from '../../components/productPageBody'
import PageWrapper from '../../components/pageWrapper'
import Header from '../../components/header'

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
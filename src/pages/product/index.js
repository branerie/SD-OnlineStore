import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import Footer from '../../components/footer'
import ProductPageBody from '../../components/productPageBody'

const ProductPage = ({ pageLength }) => {
    return (
        <>
            <ProductsContextInitializer pageLength={pageLength}>
                <Header />
                <ProductPageBody pageLength={pageLength} />
            </ProductsContextInitializer>
            <Footer />
        </>
    )
}

export default ProductPage
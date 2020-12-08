import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import Footer from '../../components/footer'
import ProductPageBody from '../../components/productPageBody'

const WomensPage = ({ pageLength }) => {
    window.history.replaceState({}, null, '/products?cat_gender=F')

    return (
        <>
            <ProductsContextInitializer
                pageLength={pageLength}>
                    <Header clickedName='Women' />
                    <ProductPageBody pageLength={pageLength} />
            </ProductsContextInitializer>
            <Footer />
        </>
    )
}

export default WomensPage
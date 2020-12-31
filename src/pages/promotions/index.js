import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import Footer from '../../components/footer'
import ProductPageBody from '../../components/productPageBody'

const PromotionsPage = ({ pageLength }) => {
    window.history.replaceState({}, null, '/products?bool_discount=true')

    return (
        <>
            <ProductsContextInitializer
                pageLength={pageLength}>
                    <Header clickedName='Promotions' />
                    <ProductPageBody pageLength={pageLength} />
            </ProductsContextInitializer>
            <Footer />
        </>
    )
}

export default PromotionsPage
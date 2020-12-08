import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import Footer from '../../components/footer'
import ProductPageBody from '../../components/productPageBody'

const MensPage = ({ pageLength }) => {
    window.history.replaceState({}, null, '/products?cat_gender=M')

    return (
        <>
            <ProductsContextInitializer
                pageLength={pageLength}>
                    <Header clickedName='Men' />
                    <ProductPageBody pageLength={pageLength} />
            </ProductsContextInitializer>
            <Footer />
        </>
    )
}

export default MensPage
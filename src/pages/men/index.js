import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import Footer from '../../components/footer'
import ProductPageBody from '../../components/productPageBody'
import PageWrapper from '../../components/pageWrapper'

const MensPage = ({ pageLength }) => {
    window.history.replaceState({}, null, '/products?cat_gender=M')

    return (
        <>
            <ProductsContextInitializer
                pageLength={pageLength}>
                <PageWrapper maxWidth='1250px'>
                    <Header clickedName='Men' />
                    <ProductPageBody pageLength={pageLength} />
                </PageWrapper>
            </ProductsContextInitializer>
        </>
    )
}

export default MensPage
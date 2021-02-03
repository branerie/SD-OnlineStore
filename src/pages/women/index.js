import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import ProductPageBody from '../../components/productPageBody'
import PageWrapper from '../../components/pageWrapper'

const WomensPage = ({ pageLength }) => {
    window.history.replaceState({}, null, '/products?cat_gender=F')

    return (
        <>
            <ProductsContextInitializer
                pageLength={pageLength}>
                <PageWrapper>
                    <Header clickedName='Women' />
                    <ProductPageBody pageLength={pageLength} />
                </PageWrapper>
            </ProductsContextInitializer>
        </>
    )
}

export default WomensPage
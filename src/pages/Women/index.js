import React from 'react'
import ProductsContextInitializer from '../../contexts/ProductsContextInitializer'

import Header from '../../components/Header'
import ProductPageBody from '../../components/ProductPageBody'
import PageWrapper from '../../components/PageWrapper'

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
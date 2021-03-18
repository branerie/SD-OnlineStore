import React from 'react'
import ProductsContextInitializer from '../../contexts/ProductsContextInitializer'

import Header from '../../components/Header'
import ProductPageBody from '../../components/ProductPageBody'
import PageWrapper from '../../components/PageWrapper'

const PromotionsPage = ({ pageLength }) => {
    window.history.replaceState({}, null, '/products?bool_discount=true')

    return (
        <>
            <ProductsContextInitializer
                pageLength={pageLength}>
                <PageWrapper>
                    <Header clickedName='Promotions' />
                    <ProductPageBody pageLength={pageLength} />
                </PageWrapper>
            </ProductsContextInitializer>
        </>
    )
}

export default PromotionsPage
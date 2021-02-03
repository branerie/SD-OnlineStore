import React from 'react'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import ProductPageBody from '../../components/productPageBody'
import PageWrapper from '../../components/pageWrapper'

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
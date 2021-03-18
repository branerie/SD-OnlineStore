import React from 'react'
import ProductsContextInitializer from '../../contexts/ProductsContextInitializer'

import Header from '../../components/Header'
import ProductPageBody from '../../components/ProductPageBody'
import PageWrapper from '../../components/PageWrapper'

const MensPage = ({ pageLength }) => {
    window.history.replaceState({}, null, '/products?cat_gender=M')

    return (
        <>
            <ProductsContextInitializer
                pageLength={pageLength}>
                <PageWrapper>
                    <Header clickedName='Men' />
                    <ProductPageBody pageLength={pageLength} />
                </PageWrapper>
            </ProductsContextInitializer>
        </>
    )
}

export default MensPage
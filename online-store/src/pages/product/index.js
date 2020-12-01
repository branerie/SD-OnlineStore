import React from 'react'
import styles from './index.module.css'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import ProductsFilter from '../../components/productsFilter'
import Pagination from '../../components/pagination'
import ProductCardsList from '../../components/productCardsList'
import ProductsPageWrapper from '../../components/productsPageWrapper'

const PAGE_LENGTH = 20

const ProductPage = () => {
    return (
        <>
            <Header />
            <div className={styles.container} >
                <ProductsContextInitializer pageLength={PAGE_LENGTH}>
                    <ProductsPageWrapper>
                        <aside className={styles['aside-container']}>
                            <ProductsFilter />
                        </aside>
                        <main className={styles['main-container']}>
                            <ProductCardsList />
                            <Pagination pageLength={PAGE_LENGTH} />
                        </main>
                    </ProductsPageWrapper>
                </ProductsContextInitializer>
            </div>
        </>
    )
}

export default ProductPage
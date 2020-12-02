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
            <ProductsContextInitializer pageLength={PAGE_LENGTH}>
                <Header />
                <div className={styles.container} >
                    <ProductsPageWrapper>
                        <aside className={styles['aside-container']}>
                            <ProductsFilter />
                        </aside>
                        <main className={styles['main-container']}>
                            <ProductCardsList />
                            <Pagination pageLength={PAGE_LENGTH} />
                        </main>
                    </ProductsPageWrapper>
                </div>
            </ProductsContextInitializer>
        </>
    )
}

export default ProductPage
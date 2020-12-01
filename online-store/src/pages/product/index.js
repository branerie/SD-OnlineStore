import React from 'react'
import styles from './index.module.css'

import Header from '../../components/header'
import ProductsContextInitializer from '../../ProductsContextInitializer'
import ProductsFilter from '../../components/productsFilter'
import Pagination from '../../components/pagination'
import ProductCardsList from '../../components/producCardsList'

const PAGE_LENGTH = 20

const ProductPage = () => {
    return (
        <>
            <Header />
            <div className={styles.container} >
            <ProductsContextInitializer pageLength={PAGE_LENGTH}>
                <aside className={styles['aside-container']}>
                    <ProductsFilter />
                </aside>
                <main className={styles['main-container']}>
                    <ProductCardsList />
                    <Pagination pageLength={PAGE_LENGTH} />
                </main>
            </ProductsContextInitializer>
            </div>
        </>
    )
} 

export default ProductPage
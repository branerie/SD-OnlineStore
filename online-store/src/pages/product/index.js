import React from 'react'
import styles from './index.module.css'
import ProductsContextInitializer from '../../ProductsContextInitializer'

import Header from '../../components/header'
import Footer from '../../components/footer'
import NavButtons from '../../components/navButtons'
import ProductsFilter from '../../components/productsFilter'
import Pagination from '../../components/pagination'
import ProductCardsList from '../../components/productCardsList'
import { parseQueryString } from '../../utils/url'

const PAGE_LENGTH = 20

const ProductPage = () => {
    const query = parseQueryString(window.location.search)
    const search = query.searchTerm || ''

    return (
        <>
            <ProductsContextInitializer pageLength={PAGE_LENGTH} search={search}>
                <Header />
                <div className={styles.container} >
                    <aside className={styles['aside-container']}>
                        <ProductsFilter />
                    </aside>
                    <main className={styles['main-container']}>
                        <NavButtons />
                        <Pagination pageLength={PAGE_LENGTH}>
                            <ProductCardsList />
                        </Pagination>
                    </main>
                </div>
            </ProductsContextInitializer>
            <Footer />
        </>
    )
}

export default ProductPage
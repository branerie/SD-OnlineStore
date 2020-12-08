import React from 'react'
import styles from './index.module.css'

import NavButtons from '../navButtons'
import ProductsFilter from '../productsFilter'
import Pagination from '../pagination'
import ProductCardsList from '../productCardsList'

const ProductPageBody = ({ pageLength }) => {
    return (
        <div className={styles.container} >
            <aside className={styles['aside-container']}>
                <ProductsFilter />
            </aside>
            <main className={styles['main-container']}>
                <NavButtons />
                <Pagination pageLength={pageLength}>
                    <ProductCardsList />
                </Pagination>
            </main>
        </div>
    )
}

export default ProductPageBody
import React from 'react'
import styles from './index.module.css'

import NavButtons from '../NavButtons'
import ProductsFilter from '../ProductsFilter'
import Pagination from '../Pagination'
import ProductCardsList from '../ProductCardsList'
import SortCriteria from '../SortCriteria'

const ProductPageBody = ({ pageLength }) => {
    return (
        <div className={styles.container} >
            <aside className={styles['aside-container']}>
                <ProductsFilter />
            </aside>
            <main className={styles['main-container']}>
                <NavButtons />
                <Pagination pageLength={pageLength}>
                    <div className={styles['sort-position']} >
                        <SortCriteria />
                    </div>
                    <ProductCardsList />
                </Pagination>
            </main>
        </div>
    )
}

export default ProductPageBody
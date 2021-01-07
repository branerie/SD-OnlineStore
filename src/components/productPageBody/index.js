import React from 'react'
import styles from './index.module.css'

import NavButtons from '../navButtons'
import ProductsFilter from '../productsFilter'
import Pagination from '../pagination'
import ProductCardsList from '../productCardsList'
import SortCriteria from '../../components/sortCriteria'

const ProductPageBody = ({ pageLength }) => {
    return (
        <div className={styles.container} >
            <aside className={styles['aside-container']}>
                <ProductsFilter />
            </aside>
            <main className={styles['main-container']}>
                <div className={styles['button-wrapper']}>
                    <NavButtons />
                </div>
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
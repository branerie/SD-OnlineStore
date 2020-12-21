import React, { useContext } from 'react'

import styles from './index.module.css'
import ProductsCheckboxFilter from '../productsCheckboxFilter'
import ProductsRangeFilter from '../productsRangeFilter'
import ProductContext from '../../ProductsContext'
import ProductsRatingFilters from '../productsRatingFilters'

const ProductsFilter = () => {
    const { productProps, productPage, totalCount } = useContext(ProductContext)
    
    if (!productProps || !productPage) {
        return (
            <div>Loading Filters...</div>
        )
    }

    const pageLength = productPage.length

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <p className={styles['center-text']}>
                        Showing {pageLength} of {totalCount} results
                    </p>
                    <p className={styles['center-text']}>Filter results:</p>
                </div>
                <ProductsCheckboxFilter
                        title='Categories'
                        propName='categories'
                        values={productProps.categories} />
                <ProductsCheckboxFilter
                        title='Brands'
                        propName='brand'
                        values={productProps.brand} />
                <ProductsCheckboxFilter
                        title='Sizes'
                        propName='sizes'
                        values={productProps.sizes} />
                <ProductsRangeFilter
                        title='Price'
                        propName='price'
                        min={productProps.minPrice}
                        max={productProps.maxPrice} />
                <ProductsRatingFilters propName='rating' />
            </div>
        </>
    )
}

export default ProductsFilter
import React, { useContext } from 'react'
import styles from './index.module.css'
import ProductsCheckboxFilter from '../ProductsCheckboxFilter'
import ProductsRangeFilter from '../ProductsRangeFilter'
import ProductContext from '../../contexts/ProductsContext'
import ProductsRatingFilters from '../ProductsRatingFilters'
import { useVisible } from '../../hooks'
import ProductsBoolFilter from '../ProductsBoolFilter'

const ProductsFilter = () => {
    const { productProps, productPage, totalCount } = useContext(ProductContext)
    const { ref, isVisible, setIsVisible } = useVisible(false)
    
    if (!productProps || !productPage) {
        return (
            <></>
        )
    }

    const pageLength = productPage.length

    return (
        <div className={styles.container}>
            <div 
                className={`${styles['menu-toggle']} ${isVisible && styles['is-active']}`}
                onClick={() => setIsVisible(!isVisible)}
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
            <div className={`${styles['media-aside']} ${isVisible && styles.active}`} ref={ref}>
                <div className={styles.title}>
                    <p className={styles['center-text']}>
                        Showing {pageLength} of {totalCount} results
                    </p>
                    <p className={styles['center-text']}>Filter results:</p>
                </div>
                <ProductsCheckboxFilter
                    title='Categories'
                    propName='categories'
                    values={productProps.categories} 
                />
                <ProductsCheckboxFilter
                    title='Brands'
                    propName='brand'
                    values={productProps.brand} 
                />
                <ProductsCheckboxFilter
                    title='Sizes'
                    propName='sizes'
                    values={productProps.sizes} 
                />
                <ProductsRangeFilter
                    title='Price'
                    propName='price'
                    min={productProps.minPrice}
                    max={productProps.maxPrice} 
                />
                <ProductsRatingFilters propName='rating' />
                <ProductsCheckboxFilter 
                    title='Gender'
                    propName='gender'
                    values={productProps.gender}
                />
                <ProductsBoolFilter
                    propName='inStock'
                    title='Availability'
                    trueTitle='In Stock'
                    falseTitle='Out Of Stock'
                />
            </div>
        </div>
    )
}

export default ProductsFilter
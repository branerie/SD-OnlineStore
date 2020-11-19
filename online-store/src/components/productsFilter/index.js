import React, { useContext } from 'react'
import styles from './index.module.css'
import ProductsCheckboxFilter from '../productsCheckboxFilter'
import ProductsRangeFilter from '../productsRangeFilter'
import ProductsBoolFilter from '../productsBoolFilter'
import ProductContext from '../../ProductsContext'

const ProductsFilter = (props) => {
    const productsContext = useContext(ProductContext)
    
    const productProps = productsContext.productProps
    if (!productProps) {
        return (
            <div>Loading Filters...</div>
        )
    }

    return (
        <aside>
            <div className={styles.container}>
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
                <ProductsBoolFilter
                        title='Discount'
                        propName='discount' />
            </div>
            <div>
                {props.children}
            </div>
        </aside>
    )
}

export default ProductsFilter
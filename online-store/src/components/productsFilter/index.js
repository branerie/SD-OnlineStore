import React from 'react'
import styles from './index.module.css'
import ProductsCheckboxFilter from '../productsCheckboxFilter'
import ProductsRangeFilter from '../productsRangeFilter'
import ProductsBoolFilter from '../productsBoolFilter'

const ProductsFilter = (props) => {
    const productProps = props.productProps
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
                        values={productProps.categories}
                        onChange={props.onCatChange} />
                <ProductsCheckboxFilter
                        title='Brands'
                        propName='brand'
                        values={productProps.brand}
                        onChange={props.onCatChange} />
                <ProductsCheckboxFilter
                        title='Sizes'
                        propName='sizes'
                        values={productProps.sizes}
                        onChange={props.onCatChange} />
                <ProductsRangeFilter
                        title='Price'
                        propName='price'
                        min={productProps.minPrice}
                        max={productProps.maxPrice}
                        onChange={props.onRangeChange} />
                <ProductsBoolFilter
                        title='Discount'
                        propName='discount'
                        onChange={props.onBoolChange} />
            </div>
            <div>
                {props.children}
            </div>
        </aside>
    )
}

export default ProductsFilter
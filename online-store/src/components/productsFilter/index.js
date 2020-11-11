import React, { useEffect, useState, useCallback } from 'react'
import styles from './index.module.css'
import ProductsCheckboxFilter from '../productsCheckboxFilter'
import { getProductRanges } from '../../utils/product'

const AdminAside = (props) => {
    // const [productProps, setProductProps] = useState(null)

    // const getProductPropsRange = useCallback(async () => {
    //     const productPropRanges = await getProductRanges()
    //     setProductProps(productPropRanges)
    // }, [setProductProps])

    // useEffect(() => {
    //     getProductPropsRange()
    // }, [getProductPropsRange])

    // if (!productProps) {
    //     return (
    //         <div>Loading...</div>
    //     )
    // }

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
            </div>
            <div>
                {props.children}
            </div>
        </aside>
    )
}

export default AdminAside
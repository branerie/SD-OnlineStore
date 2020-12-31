import React, { useContext } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'
import ProductCard from '../productCard'

const ProductCardsList = () => {
    const productsContext = useContext(ProductsContext)
    const { productPage } = productsContext

    function renderProductList() {
        if(!productPage) {
            return <></>
        }

        return productPage.map(product => {
            return (
                <ProductCard key={product.id} {...product} />
            )
        })
    }


    return (
        <div className={styles.container}>
            {renderProductList()}
        </div>
    )
}

export default ProductCardsList
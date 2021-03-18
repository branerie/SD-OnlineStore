import React, { useContext } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../contexts/ProductsContext'
import ProductCard from '../ProductCard'

const ProductCardsList = () => {
    const productsContext = useContext(ProductsContext)
    const { productPage } = productsContext

    if (!productPage) {
        return null
    }

    return (
        <div className={styles.container}>
            { 
                productPage.map(product => {
                    return (
                        <ProductCard 
                            key={product.id}
                            brand={product.brand}
                            discount={product.discount}
                            discountPrice={product.discountPrice}
                            images={product.images}
                            price={product.price}
                            productId={product.id}
                            ratingCount={product.ratingCount}
                            ratingStars={product.ratingStars}
                        />
                    )
                })
            }
        </div>
    )
}

export default ProductCardsList
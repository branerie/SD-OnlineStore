import React from 'react'
import styles from './index.module.css'

import CategoryCards from '../../components/categoryCards'
import indexImage from '../../images/index.jpg'
import Header from '../../components/header'
import ProductsContextInitializer from '../../ProductsContextInitializer'

const HomePage = () => {
    return (
        <>
            <ProductsContextInitializer>
                <Header />
            </ProductsContextInitializer>
            <div>
                <img
                    src={indexImage}
                    className={styles['home-image']}
                    alt='Girl in front of mirror' />
            </div>
            <div>
                <h3 className={styles['secondary-title']}>top categories</h3>
                <CategoryCards />
            </div>
        </>
    )
}

export default HomePage
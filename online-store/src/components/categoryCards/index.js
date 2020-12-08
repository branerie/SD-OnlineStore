import React from 'react'
import styles from './index.module.css'

import CategoryCard from '../categoryCard'

import jacketsImage from '../../images/jacketsCategory.jpg'
import dressesImage from '../../images/dressesCategory.jpg'
import shirtsImage from '../../images/shirtsCategory.jpg'
import jeansImage from '../../images/jeansCategory.jpg'
import tShirtsImage from '../../images/tshirtsCategory.jpg'

const CategoryCards = () => {
    return (
        <div className={styles.container}>
            <CategoryCard
                src={jacketsImage}
                name='Jackets'
                href='/products?cat_categories=Jackets' />
            <CategoryCard
                src={dressesImage}
                name='Dresses'
                href='/products?cat_categories=Dresses' />
            <CategoryCard
                src={shirtsImage}
                name='Shirts'
                href='/products?cat_categories=Shirts' />
            <CategoryCard
                src={jeansImage} 
                name='Jeans'
                href='/products?cat_categories=Jeans' />
            <CategoryCard
                src={tShirtsImage}
                name='T-shirts'
                href='/products?cat_categories=T-shirts' />
        </div>
    )
}

export default CategoryCards
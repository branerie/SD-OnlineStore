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
            <CategoryCard src={jacketsImage} name='Jackets' />
            <CategoryCard src={dressesImage} name='Dresses' />
            <CategoryCard src={shirtsImage} name='Shirts' />
            <CategoryCard src={jeansImage} name='Jeans' />
            <CategoryCard src={tShirtsImage} name='T-shirts' />
        </div>
    )
}

export default CategoryCards
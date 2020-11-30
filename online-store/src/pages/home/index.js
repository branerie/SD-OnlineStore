import React from 'react'
import styles from './index.module.css'

import CategoryCards from '../../components/categoryCards'

import leftImage from '../../images/homeImage1.jpg'
import rightImage from '../../images/homeImage2.jpg'

import Header from '../../components/header'

const HomePage = () => {
    return (
        <>
            <Header />
            <div>
                <img src={leftImage} style={{ 'max-height': '32rem' }} />
                <img src={rightImage} style={{ 'max-height': '32rem' }} />
            </div>
            <div>
                <h3 className={styles['secondary-title']}>top categories</h3>
                <CategoryCards />
            </div>
        </>
    )
}

export default HomePage
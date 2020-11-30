import React from 'react'
import styles from './index.module.css'

import CategoryCards from '../../components/categoryCards'

import indexImage from '../../images/index.jpg'

import Header from '../../components/header'

const HomePage = () => {
    return (
        <>
            <Header />
            <div>
                <img src={indexImage} className={styles['home-image']} />
            </div>
            <div>
                <h3 className={styles['secondary-title']}>top categories</h3>
                <CategoryCards />
            </div>
        </>
    )
}

export default HomePage
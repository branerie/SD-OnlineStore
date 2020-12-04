import React from 'react'
import styles from './index.module.css'

import CategoryCards from '../../components/categoryCards'
import indexImage from '../../images/index.jpg'
import HeaderHome from '../../components/headerHome'
import Footer from '../../components/footer'

const HomePage = () => {
    return (
        <>
            <HeaderHome />
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
            <Footer />
        </>
    )
}

export default HomePage
import React from 'react'
import styles from './index.module.css'
import indexImage from '../../images/index.jpg'

import CategoryCards from '../../components/categoryCards'
import HomeBottom from '../../components/homeBottom'
import PageWrapper from '../../components/pageWrapper'
import HeaderHome from '../../components/headerHome'

const HomePage = () => {
    return (
        <PageWrapper>
            <HeaderHome />
            <div className={styles['img-container']}>
                <img
                    src={indexImage}
                    className={styles['home-image']}
                    alt='Girl in front of mirror' />
            </div>
            <section className={styles['cards-container']}>
                <h3 className={styles['secondary-title']}>top categories</h3>
                <CategoryCards />
            </section>
            <HomeBottom />
        </PageWrapper>
    )
}

export default HomePage
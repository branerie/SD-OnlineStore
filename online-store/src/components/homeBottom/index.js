import React from 'react'
import styles from './index.module.css'

import logo from '../../images/whyLogo.png'
import fastDelivery from '../../images/fastDelivery.svg'
import freeReturn from '../../images/freeReturn.svg'
import fallingPrices from '../../images/fallingPrices.svg'
import zillionsOfProducts from '../../images/zillionsOfProducts.svg'
import masks from '../../images/masks.jpg'


const HomeBottom = () => {
    return (
        <section className={styles['page-bottom']}>
            <div className={styles['bottom-left']}>
                <div className={styles['bottom-img-container']}>
                    <img src={logo} alt='Company logo' className={styles['bottom-logo']} />
                </div>
                <div className={styles['bottom-reasons']}>
                    <div className={styles['img-container']}>
                        <img
                            src={fastDelivery}
                            alt='Fast delivery'
                            style={{ width: '3.5rem' }} />
                        <span>fast delivery</span>
                    </div>
                    <div className={styles['img-container']}>
                        <img
                            src={fallingPrices}
                            alt='Falling prices'
                            style={{ width: '2rem' }} />
                        <span>falling prices</span>
                    </div>
                    <div className={styles['img-container']}>
                        <img
                            src={freeReturn}
                            alt='Free return'
                            style={{ width: '4rem' }} />
                        <span>free return</span>
                    </div>
                    <div className={styles['img-container']}>
                        <img
                            src={zillionsOfProducts}
                            alt='Zillions of products'
                            style={{ width: '3.5rem' }} />
                        <span>zillions of products</span>
                    </div>
                </div>
                <div className={styles['bottom-text']}>
                    your <span className={styles['gray-text']}>fashion</span> identity is here
                </div>
            </div>
            <div className={styles['bottom-right']}>
                <div className={styles['mask-container']}>
                    <span className={styles['masks-text']}>masks</span>
                    <img src={masks} alt='Masks' className={styles['img-masks']} />
                </div>
            </div>
            <div className={styles['gray-bg']}></div>
        </section>
    )
}

export default HomeBottom
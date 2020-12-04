import React from 'react'
import styles from './index.module.css'

import phoneIcon from '../../images/phoneIcon.svg'
import mailIcon from '../../images/mailIcon.svg'
import facebookIcon from '../../images/facebookIcon.svg'
import youtubeIcon from '../../images/youtubeIcon.svg'
import instagramIcon from '../../images/instagramIcon.svg'
import pinterestIcon from '../../images/pinterestIcon.svg'
import twitterIcon from '../../images/twitterIcon.svg'

const Footer = () => { 
    return (
        <footer>
            <ul>
                <h3 className={styles['column-title']}>Contact us:</h3>
                <li className={styles['column-item']}>
                    <img src={phoneIcon} alt='Contact phone' className={styles.icon} />
                    <span className={styles['icon-text']}>+1 949 417 8971</span>
                </li>
                <li className={styles['column-item']}>
                    <img src={mailIcon} alt='Contact email' className={styles.icon} />
                    <span className={styles['icon-text']}>office@smartdesign.com</span>
                </li>
                <li className={styles['column-item']}>we are here 24/7 to support</li>
                <li className={styles['column-item']}>your fashion needs</li>
            </ul>
            <ul>
                <h3 className={styles['column-title']}>Get to know us</h3>
                <li className={styles['column-item']}>
                    about find <span style={{ color: 'red', paddingLeft: '2px' }}>u</span>
                </li>
                <li className={styles['column-item']}>
                    blog
                </li>
                <li className={styles['column-item']}>
                    contact us
                </li>
                <li className={styles['column-item']}>
                    useful information
                </li>
                <li className={styles['column-item']}>
                    questions and answers
                </li>
                <li className={styles['column-item']}>
                    jobs
                </li>
            </ul>
            <ul>
                <h3 className={styles['column-title']}>how we can help you</h3>
                <li className={styles['column-item']}>
                    track your order
                </li>
                <li className={styles['column-item']}>
                    your account
                </li>
                <li className={styles['column-item']}>
                    your orders
                </li>
                <li className={styles['column-item']}>
                    payment & return policy
                </li>
                <li className={styles['column-item']}>
                    payment methods
                </li>
                <li className={styles['column-item']}>
                    help
                </li>
            </ul>
            <ul>
                <h3 className={styles['column-title']}>our website</h3>
                <li className={styles['column-item']}>
                    cookies
                </li>
                <li className={styles['column-item']}>
                    privacy policy
                </li>
                <li className={styles['column-item']}>
                    terms & conditions
                </li>
                <li className={styles['column-item']}>
                    sitemap
                </li>
            </ul>
            <ul className={styles['social-media']}>
                <h3 className={styles['column-title']}>follow us:</h3>
                <li className={styles['column-item']}>
                    <img src={facebookIcon} alt='Link to our facebook account' className={styles.icon} />
                    <img src={youtubeIcon} alt='Link to our youtube account' className={styles.icon} />
                    <img src={instagramIcon} alt='Link to our instagram account' className={styles.icon} />
                    <img src={pinterestIcon} alt='Link to our pinterest account' className={styles.icon} />
                    <img src={twitterIcon} alt='Link to our twitter account' className={styles.icon} />
                </li>
                <li className={styles['column-item']}>
                    &#169; Copyright 2020 - SmartDesign 2006,
                </li>
                <li className={styles['column-item']}>
                    BULGARIA, 9000 VARNA, 166A SLIVNITZA BLVD.
                </li>
            </ul>
        </footer>
    )
}   

export default Footer
import React from 'react'
import styles from './index.module.css'

import FooterItem from '../FooterItem'
import FooterTitle from '../FooterTitle'

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
                <FooterTitle title='Contact us:' />
                <FooterItem>
                    <img src={phoneIcon} alt='Contact phone' className={styles.icon} />
                    <span className={styles['icon-text']}>+1 949 417 8971</span>
                </FooterItem>
                <FooterItem>
                    <img src={mailIcon} alt='Contact email' className={styles.icon} />
                    <span className={styles['icon-text']}>office@smartdesign.com</span>
                </FooterItem>
                <FooterItem text='we are here 24/7 to support' />
                <FooterItem text='your fashion needs' />
            </ul>
            <ul>
                <FooterTitle title='Get to know us' />
                <FooterItem>
                    about find <span style={{ color: 'red', paddingLeft: '2px' }}>u</span>
                </FooterItem>
                <FooterItem text='blog' />
                <FooterItem text='contact us' />
                <FooterItem text='useful information' />
                <FooterItem text='questions and answers' />
                <FooterItem text='jobs' />
            </ul>
            <ul>
                <FooterTitle title='how we can help you' />
                <FooterItem text='track your order' />
                <FooterItem text='your account' />
                <FooterItem text='your orders' />
                <FooterItem text='payment & return policy' />
                <FooterItem text='payment methods' />
                <FooterItem text='help' />
            </ul>
            <ul>
                <FooterTitle title='our website' />
                <FooterItem text='cookies' />
                <FooterItem text='privacy policy' />
                <FooterItem text='terms & conditions' />
                <FooterItem text='sitemap' />
            </ul>
            <ul className={styles['social-media']}>
                <FooterTitle title='follow us:' />
                <FooterItem>
                    <img src={facebookIcon} alt='Link to our facebook account' className={styles.icon} />
                    <img src={youtubeIcon} alt='Link to our youtube account' className={styles.icon} />
                    <img src={instagramIcon} alt='Link to our instagram account' className={styles.icon} />
                    <img src={pinterestIcon} alt='Link to our pinterest account' className={styles.icon} />
                    <img src={twitterIcon} alt='Link to our twitter account' className={styles.icon} />
                </FooterItem>
                <FooterItem text='&#169; Copyright 2020 - SmartDesign 2006,' />
                <FooterItem text='BULGARIA, 9000 VARNA, 166A SLIVNITZA BLVD.' />
            </ul>
        </footer>
    )
}   

export default Footer
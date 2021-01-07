import React from 'react'
import styles from './index.module.css'

const FooterItem = ({ children, text }) => {
    return (
        <li className={styles['column-item']}>
            {text ? text : children}
        </li>
    )
} 

export default FooterItem
import React from 'react'
import styles from './index.module.css'

export default ({ children, text }) => {
    return (
        <li className={styles['column-item']}>
            {text ? text : children}
        </li>
    )
} 
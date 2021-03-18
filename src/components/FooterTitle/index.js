import React from 'react'
import styles from './index.module.css'

const FooterTitle = ({ title }) => {
    return <h3 className={styles['column-title']}>{title}</h3>
}

export default FooterTitle
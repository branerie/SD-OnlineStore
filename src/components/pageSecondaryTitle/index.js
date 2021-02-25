import React from 'react'
import styles from './index.module.css'

const PageSecondaryTitle = ({ title, style }) => {
    return <div className={styles.title} style={style}>{title}</div>
}

export default PageSecondaryTitle
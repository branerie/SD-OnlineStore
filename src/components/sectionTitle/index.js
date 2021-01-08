import React from 'react'
import styles from './index.module.css'

const SectionTitle = ({ title }) => {
    return (
        <h3 className={styles.title}>{title}</h3>
    )
}

export default SectionTitle
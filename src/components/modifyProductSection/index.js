import React from 'react'
import styles from './index.module.css'

const ModifyProductSection = ({ title, children }) => {
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            {children}
        </div>
    )
}

export default ModifyProductSection
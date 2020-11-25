import React from 'react'
import styles from './index.module.css'

const CategoryCard = ({ src, name }) => {
    const alt = `Link to ${name} category`

    return (
        <div className={styles.card}>
            <img src={src} alt={alt} className={styles['background-image']} />
            <span className={styles.name}>{name}</span>
        </div>
    )
}

export default CategoryCard
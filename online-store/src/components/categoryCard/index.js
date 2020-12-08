import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

const CategoryCard = ({ src, name, href }) => {
    const alt = `Link to ${name} category`

    return (
        <Link to={href}>
            <div className={styles.card}>
                <img src={src} alt={alt} className={styles['background-image']} />
                <span className={styles.name}>{name}</span>
            </div>
        </Link>
    )
}

export default CategoryCard